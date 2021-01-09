import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import classes from './Groups.module.css'
import List from '../../components/List/List'
import Input from '../../components/Input/Input'
import Popout from '../../components/Popout/Popout'
import Header from '../../components/Header/Header'
import Form from '../../components/Form/Form'
import Spinner from '../../components/Spinner/Spinner'
import Sub from '../../components/Sub/Sub'
import Select from '../../components/Select/Select'

const ADDING = 'ADDING'
const EDITING = 'EDITING'
const DETAILS = 'DETAILS'
const NUMBERS = [5, 10, 15, 20, 30, 40, 50, 100]

const API = axios.create({
  baseURL: 'https://rest-groups-and-students.herokuapp.com/',
  timeout: 30000,
  crossDomain: true,
})

const Groups = (props) => {
  const [groups, setGroups] = useState(null)
  const [error, setError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [details, setDetails] = useState(null)
  const [errorDetails, setErrorDetails] = useState(null)
  const [fetchingDetails, setFetchingDetails] = useState(false)
  const [popout, setPopout] = useState(null)
  const [validateError, setValidateError] = useState(null)
  const [inputGroup, setInputGroup] = useState({ id: null, name: '' })
  const [paginationSize, setPaginationSize] = useState(5)

  useEffect(() => {
    setFetching(true)
    API.get('groups').then(
      (res) => {
        setGroups(res.data)
        setFetching(false)
      },
      (err) => {
        setError(err)
        setFetching(false)
      }
    )
  }, [])

  const onChangeInput = useCallback(
    (e) => {
      const isUniq = !groups.some((group) => group.name === e.target.value)
      if (isUniq) {
        validateError && setValidateError(null)
      } else setValidateError('This value is already busy')
      setInputGroup((prev) => {
        return { ...prev, name: e.target.value }
      })
    },
    [groups, validateError]
  )
  const handleClickClosePopout = useCallback(() => {
    setPopout(null)
    setInputGroup({ id: null, name: '' })
    validateError && setValidateError(null)
  }, [validateError])

  const onChangePaginationSize = useCallback((e) => setPaginationSize(+e.target.value), [])

  const handleClickAccept = useCallback(
    (e) => {
      e.preventDefault()
      if (!validateError) {
        const id = e.target.id.value
        const name = e.target.name.value

        API.put(`groups/${id}`, {
          name,
        }).then(
          (res) => {
            if (res.status === 200) {
              setGroups(
                groups.map((group) => {
                  if (String(group.id) === String(id)) {
                    group.name = name
                  }
                  return group
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
    [groups, handleClickClosePopout, validateError]
  )

  const handleClickSend = useCallback(
    (e) => {
      e.preventDefault()

      if (!validateError) {
        const name = e.target.name.value

        API.post(`groups`, {
          name,
        }).then(
          (res) => {
            if (res.status === 200) {
              const temp = groups
              temp.push(res.data)
              setGroups(temp)
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
    [groups, handleClickClosePopout, validateError]
  )

  const handleClickLabel = useCallback((id) => {
    setPopout(DETAILS)
    setFetchingDetails(true)
    API.get(`groups/${id}`).then(
      (res) => {
        setDetails(res.data)
        setFetchingDetails(false)
      },
      (err) => {
        setErrorDetails(err)
        setFetchingDetails(false)
      }
    )
  }, [])

  const handleClickEdit = useCallback(
    (id) => {
      const group =
        groups[
          groups.findIndex((item) => {
            return item.id === id
          })
        ]

      setInputGroup({ id: group.id, name: group.name })
      setPopout(EDITING)
    },
    [groups]
  )

  const handleClickDelete = useCallback(
    (id) => {
      API.delete(`groups/${id}`).then(
        (res) => {
          if (res.status === 200) {
            setGroups(groups.filter((group) => group.id !== id))
          } else {
            setError(res.data)
          }
        },
        (err) => {
          setError(err)
        }
      )
    },
    [groups]
  )

  const handleClickAdd = useCallback(() => setPopout(ADDING), [])

  return (
    <div className={classes.Groups}>
      {fetching ? (
        <Spinner />
      ) : error ? (
        <Popout onClose={() => setError(null)}>{error}</Popout>
      ) : (
        groups && (
          <>
            <List
              className={classes.List}
              onClickLabel={handleClickLabel}
              onClickEdit={handleClickEdit}
              onClickDelete={handleClickDelete}
              onClickAdd={handleClickAdd}
              array={groups}
              mainProperty={'name'}
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
              value={inputGroup.name}
              onChange={onChangeInput}
              validateError={validateError}
              label={'Enter a name'}
              required
              autoFocus
            />
          </Form>
        </Popout>
      ) : popout === EDITING ? (
        <Popout onClose={handleClickClosePopout}>
          <Header>Editing</Header>
          <Form submitText={'Accept'} onSubmit={handleClickAccept}>
            <input hidden name="id" value={inputGroup.id} readOnly />
            <Input
              name="name"
              value={inputGroup.name}
              onChange={onChangeInput}
              validateError={validateError}
              label={'Enter a name'}
              required
              autoFocus
            />
          </Form>
        </Popout>
      ) : (
        popout === DETAILS && (
          <Popout className={classes.PopoutDetails} onClose={handleClickClosePopout}>
            {fetchingDetails ? (
              <Spinner centerColor="#1e7a6d" />
            ) : errorDetails ? (
              <Popout onClose={() => setError(null)}>{error}</Popout>
            ) : (
              details && (
                <>
                  <Header>Details</Header>
                  <Sub>{details.name}</Sub>
                  <List
                    indexOn
                    className={classes.Details}
                    array={details.students}
                    mainProperty={'name'}
                    idProperty={'id'}
                    pagination={5}
                  />
                </>
              )
            )}
          </Popout>
        )
      )}
    </div>
  )
}

export default Groups
