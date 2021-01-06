import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import List from '../../components/List/List'
import classes from './Students.module.css'
import Input from '../../components/Input/Input'
import Popout from '../../components/Popout/Popout'
import Select from '../../components/Select/Select'
import Header from '../../components/Header/Header'
import Form from '../../components/Form/Form'
import Spinner from '../../components/Spinner/Spinner'

const API = axios.create({
  baseURL: 'https://rest-groups-and-students.herokuapp.com/',
  timeout: 10000,
  crossDomain: true,
})

const Students = (props) => {
  const [students, setStudents] = useState([])
  const [error, setError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [popout, setPopout] = useState(null)

  useEffect(() => {
    setFetching(true)

    API.get('students').then(
      (res) => {
        setStudents(res.data)
        setFetching(false)
      },
      (err) => {
        setError(err)
        setFetching(false)
      }
    )
  }, [])

  const handleClickAccept = useCallback(
    (e) => {
      e.preventDefault()

      const id = e.target.id.value
      const name = e.target.name.value
      const groupName = e.target.groupName.value
      API.put(`students/${id}`, {
        name,
        groupName,
      }).then(
        (res) => {
          if (res.status === 200) {
            setStudents(
              students.map((student) => {
                if (String(student.id) === String(id)) {
                  student.name = name || student.name
                  student.groupName = groupName || student.groupName
                }
                return student
              })
            )
          } else {
            setError(res.data)
          }
          setPopout(null)
        },
        (err) => {
          setError(err)
          setFetching(false)
          setPopout(null)
        }
      )
    },
    [students]
  )

  const handleClickSend = useCallback(
    (e) => {
      e.preventDefault()

      const name = e.target.name.value
      const groupName = e.target.groupName.value
      API.post(`students`, {
        name,
        groupName,
      }).then(
        (res) => {
          if (res.status === 200) {
            const temp = students
            temp.push(res.data)
            setStudents(temp)
          } else {
            setError(res.data)
          }
          setPopout(null)
        },
        (err) => {
          setError(err)
          setFetching(false)
          setPopout(null)
        }
      )
    },
    [students]
  )

  const handleClickEdit = useCallback(
    (id) => {
      const student =
        students[
          students.findIndex((item) => {
            return item.id === id
          })
        ]

      API.get('groups').then(
        (res) => {
          let groups = res.data
          groups = groups.map((group) => group.name)
          setPopout(
            <Popout onClose={() => setPopout(null)}>
              <Header>Editing</Header>
              <Form submitText={'Accept'} onSubmit={handleClickAccept}>
                <input hidden name="id" value={id} readOnly />
                <Input name="name" value={student.name} label={'Enter a name'} />
                <Select
                  name="groupName"
                  label={'Select a group'}
                  options={groups}
                  defaultValue={student.groupName}
                />
              </Form>
            </Popout>
          )
        },
        (err) => setError(err)
      )
    },
    [handleClickAccept, students]
  )

  const handleClickDelete = useCallback(
    (id) => {
      API.delete(`students/${id}`).then(
        (res) => {
          if (res.status === 200) {
            setStudents(students.filter((student) => student.id !== id))
          } else {
            setError(res.data)
          }
        },
        (err) => {
          setError(err)
        }
      )
    },
    [students]
  )

  const handleClickAdd = useCallback(() => {
    API.get('groups').then(
      (res) => {
        let groups = res.data
        groups = groups.map((group) => group.name)
        setPopout(
          <Popout onClose={() => setPopout(null)}>
            <Header>Adding</Header>
            <Form submitText={'Send'} onSubmit={handleClickSend}>
              <Input name="name" label={'Enter a name'} required />
              <Select name="groupName" label={'Select a group'} options={groups} />
            </Form>
          </Popout>
        )
      },
      (err) => setError(err)
    )
  }, [handleClickSend])

  return (
    <div>
      {fetching ? (
        <Spinner />
      ) : error ? (
        <Popout onClose={() => setError(null)}>{error}</Popout>
      ) : (
        <List
          className={classes.List}
          onClickEdit={handleClickEdit}
          onClickDelete={handleClickDelete}
          onClickAdd={handleClickAdd}
          array={students}
          mainProperty={'name'}
          subProperty={'groupName'}
          idProperty={'id'}
          pagination={10}
        />
      )}
      {popout}
    </div>
  )
}

export default Students
