import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import List from '../List/List'

const TEST_ID = 1
const TEST_NAME = 'TEST_NAME'
const TEST_LASTNAME = 'TEST_LASTNAME'
const TEST_CLASS = 'TEST_CLASS'

describe('List', () => {
  const array = [
    { id: TEST_ID, name: TEST_NAME, lastname: TEST_LASTNAME },
    { id: 2, name: 'TestName2', lastname: 'TestLastname1' },
    { id: 3, name: 'TestName3', lastname: 'TestLastname1' },
  ]
  describe('renders with array and mainProperty', () => {
    const { container } = render(<List array={array} mainProperty="name" />)
    const list = container.querySelector('.List')
    const ul = list.firstChild

    test('renders component', () => {
      expect(list).toBeInTheDocument()
    })
    test('renders ul', () => {
      expect(ul).toBeDefined()
    })
    test('renders li', () => {
      expect(ul.querySelectorAll('li').length).toBe(array.length)
    })
    test('render mainProperty text', () => {
      const firstLi = ul.firstChild
      const [main] = firstLi.childNodes
      expect(main.textContent).toBe(TEST_NAME)
    })
    test('render properly', () => {
      expect(list).toMatchSnapshot()
    })
  })

  describe('renders with array, mainProperty and subProperty', () => {
    const { container } = render(<List array={array} mainProperty="name" subProperty="lastname" />)
    const list = container.querySelector('.List')
    const ul = list.firstChild

    test('renders li', () => {
      expect(ul.querySelectorAll('li').length).toBe(array.length)
    })
    test('render mainProperty text', () => {
      const firstLi = ul.firstChild
      const [main] = firstLi.childNodes
      expect(main.textContent).toBe(TEST_NAME)
    })
    test('render subProperty text', () => {
      const firstLi = ul.firstChild
      const [, sub] = firstLi.childNodes
      expect(sub.textContent).toBe(TEST_LASTNAME)
    })
    test('render properly', () => {
      expect(list).toMatchSnapshot()
    })
  })

  describe('renders with array, mainProperty and indexOn', () => {
    const { container } = render(<List array={array} mainProperty="name" indexOn />)
    const list = container.querySelector('.List')
    const ul = list.firstChild

    test('renders li', () => {
      expect(ul.querySelectorAll('li').length).toBe(array.length)
    })
    test('render mainProperty text', () => {
      const firstLi = ul.firstChild
      const [, main] = firstLi.childNodes
      expect(main.textContent).toBe(TEST_NAME)
    })
    test('render index', () => {
      const firstLi = ul.firstChild
      const [index] = firstLi.childNodes
      expect(index.textContent).toBe('1')
    })
    test('render properly', () => {
      expect(list).toMatchSnapshot()
    })
  })

  describe('renders with array, mainProperty and pagination', () => {
    const PAGINATION = 2
    const { container } = render(<List array={array} mainProperty="name" pagination={PAGINATION} />)
    const list = container.querySelector('.List')
    const ul = list.firstChild

    test('renders li in the number of pagination', () => {
      expect(ul.querySelectorAll('li').length).toBe(PAGINATION)
    })
    test('render mainProperty text', () => {
      const firstLi = ul.firstChild
      const [main] = firstLi.childNodes
      expect(main.textContent).toBe(TEST_NAME)
    })

    test('render properly', () => {
      expect(list).toMatchSnapshot()
    })
  })

  describe('Clicks', () => {
    test('onClickAdd', () => {
      const handleClickAdd = jest.fn()
      render(<List array={array} mainProperty="name" onClickAdd={handleClickAdd} />)
      userEvent.click(screen.getAllByAltText('add')[0])
      expect(handleClickAdd).toHaveBeenCalledTimes(1)
    })

    test('onClickDelete', () => {
      const handleClickDelete = jest.fn((id) => id)
      render(<List array={array} mainProperty="name" onClickDelete={handleClickDelete} />)
      userEvent.click(screen.getAllByAltText('delete')[0])
      expect(handleClickDelete).toHaveBeenCalledTimes(1)
      expect(handleClickDelete.mock.results[0].value).toBe(1)
    })

    test('onClickEdit', () => {
      const handleClickEdit = jest.fn((id) => id)
      render(<List array={array} mainProperty="name" onClickEdit={handleClickEdit} />)
      userEvent.click(screen.getAllByAltText('edit')[0])
      expect(handleClickEdit).toHaveBeenCalledTimes(1)
      expect(handleClickEdit.mock.results[0].value).toBe(1)
    })

    test('onClickLabel', () => {
      const handleClickLabel = jest.fn((id) => id)
      render(<List array={array} mainProperty="name" onClickLabel={handleClickLabel} />)
      userEvent.click(screen.getByText(TEST_NAME))
      expect(handleClickLabel).toHaveBeenCalledTimes(1)
      expect(handleClickLabel.mock.results[0].value).toBe(1)
    })
  })

  test('gets a class', () => {
    const { container } = render(<List array={array} mainProperty="name" className={TEST_CLASS} />)
    expect(container.querySelector('.List')).toHaveClass(TEST_CLASS)
  })
})
