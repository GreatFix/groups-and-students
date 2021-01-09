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

const ADDING = 'ADDING'
const EDITING = 'EDITING'
const NUMBERS = [5, 10, 15, 20, 30, 40, 50, 100]

const API = axios.create({
  baseURL: 'https://rest-groups-and-students.herokuapp.com/',
  timeout: 10000,
  crossDomain: true,
})

const Students = (props) => {
  const [students, setStudents] = useState([])
  const [groups, setGroups] = useState([])
  const [error, setError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [popout, setPopout] = useState(null)
  const [validateError, setValidateError] = useState(null)
  const [inputStudent, setInputStudent] = useState({ id: null, name: '', groupName: '' })
  const [paginationSize, setPaginationSize] = useState(5)

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

    API.get('groups').then(
      (res) => setGroups(res.data.map((group) => group.name)),
      (err) => setError(err)
    )
  }, [])

  const onChangeInput = useCallback(
    (e) => {
      const isUniq = !students.some((student) => student.name === e.target.value)
      if (isUniq) {
        validateError && setValidateError(null)
      } else setValidateError('This value is already busy')
      setInputStudent((prev) => {
        return { ...prev, name: e.target.value }
      })
    },
    [students, validateError]
  )

  const onChangePaginationSize = useCallback((e) => setPaginationSize(+e.target.value), [])

  const handleClickClosePopout = useCallback(() => {
    setPopout(null)
    setInputStudent({ id: null, name: '', groupName: '' })
    validateError && setValidateError(null)
  }, [validateError])

  const handleClickAccept = useCallback(
    (e) => {
      e.preventDefault()
      if (!validateError) {
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
            handleClickClosePopout()
          },
          (err) => {
            setError(err)
            setFetching(false)
            handleClickClosePopout()
          }
        )
      }
    },
    [handleClickClosePopout, students, validateError]
  )

  const handleClickSend = useCallback(
    (e) => {
      e.preventDefault()
      if (!validateError) {
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
            handleClickClosePopout()
          },
          (err) => {
            setError(err)
            setFetching(false)
            handleClickClosePopout()
          }
        )
      }
    },
    [handleClickClosePopout, students, validateError]
  )

  const handleClickEdit = useCallback(
    (id) => {
      const student =
        students[
          students.findIndex((item) => {
            return item.id === id
          })
        ]

      setInputStudent({ id: student.id, name: student.name, groupName: student.groupName })
      setPopout(EDITING)
    },
    [students]
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

  const handleClickAdd = useCallback(() => setPopout(ADDING), [])

  return (
    <div className={classes.Students}>
      {fetching ? (
        <Spinner />
      ) : error ? (
        <Popout onClose={() => setError(null)}>{error}</Popout>
      ) : (
        students && (
          <>
            <List
              className={classes.List}
              onClickEdit={handleClickEdit}
              onClickDelete={handleClickDelete}
              onClickAdd={handleClickAdd}
              array={students}
              mainProperty={'name'}
              subProperty={'groupName'}
              idProperty={'id'}
              pagination={paginationSize}
            />
            <div className={classes.PaginationSelect}>
              <Select
                name="paginationSize"
                value={paginationSize}
                onChange={onChangePaginationSize}
                label={'Lines per page'}
                options={NUMBERS}
              />
            </div>
          </>
        )
      )}
      {popout === ADDING ? (
        <Popout onClose={handleClickClosePopout}>
          <Header>Adding</Header>
          <Form submitText={'Send'} onSubmit={handleClickSend}>
            <Input
              name="name"
              value={inputStudent.name}
              onChange={onChangeInput}
              validateError={validateError}
              label={'Enter a name'}
              required
              autoFocus
            />
            <Select name="groupName" label={'Select a group'} options={groups} />
          </Form>
        </Popout>
      ) : (
        popout === EDITING && (
          <Popout onClose={handleClickClosePopout}>
            <Header>Editing</Header>
            <Form submitText={'Accept'} onSubmit={handleClickAccept}>
              <input hidden name="id" value={inputStudent.id} readOnly />
              <Input
                name="name"
                value={inputStudent.name}
                onChange={onChangeInput}
                validateError={validateError}
                label={'Enter a name'}
                required
                autoFocus
              />
              <Select
                name="groupName"
                label={'Select a group'}
                options={groups}
                defaultValue={inputStudent.groupName}
              />
            </Form>
          </Popout>
        )
      )}
    </div>
  )
}

export default Students
