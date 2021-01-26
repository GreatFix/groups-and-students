import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Cell from '../Cell/Cell'

const TEST_ID = 1
const TEST_INDEX = 5
const TEST_SUBTEXT = 'TEST_SUBTEXT'
const TEST_CLASS = 'TEST_CLASS'
const TEST_TEXT = 'TEST_TEXT'

describe('Cell', () => {
  describe('renders with children and id', () => {
    const { container } = render(<Cell id={TEST_ID}>{TEST_TEXT}</Cell>)
    const cell = container.querySelector('.Cell')
    const simpleCell = cell.querySelector('.SimpleCell')

    test('renders SimpleCell', () => {
      expect(simpleCell).toHaveTextContent(TEST_TEXT)
    })
    test('render properly', () => {
      expect(cell).toMatchSnapshot()
    })
  })

  describe('renders with index', () => {
    const { container } = render(
      <Cell id={TEST_ID} index={TEST_INDEX}>
        {TEST_TEXT}
      </Cell>
    )
    const cell = container.querySelector('.Cell')
    const index = cell.querySelector('.Index')

    test('renders SimpleCell', () => {
      expect(index).toHaveTextContent(TEST_INDEX)
    })
    test('render properly', () => {
      expect(cell).toMatchSnapshot()
    })
  })

  describe('renders with subContent', () => {
    const { container } = render(
      <Cell id={TEST_ID} subContent={TEST_SUBTEXT}>
        {TEST_TEXT}
      </Cell>
    )
    const cell = container.querySelector('.Cell')
    const sub = cell.querySelector('.Sub')

    test('renders SimpleCell', () => {
      expect(sub).toHaveTextContent(TEST_SUBTEXT)
    })
    test('render properly', () => {
      expect(cell).toMatchSnapshot()
    })
  })

  describe('Clicks', () => {
    test('onClickDelete', () => {
      const handleClickDelete = jest.fn((id) => id)
      render(
        <Cell id={TEST_ID} onClickDelete={handleClickDelete}>
          {TEST_TEXT}
        </Cell>
      )
      userEvent.click(screen.getAllByAltText('delete')[0])
      expect(handleClickDelete).toHaveBeenCalledTimes(1)
      expect(handleClickDelete.mock.results[0].value).toBe(TEST_ID)
    })

    test('onClickEdit', () => {
      const handleClickEdit = jest.fn((id) => id)
      render(
        <Cell id={TEST_ID} onClickEdit={handleClickEdit}>
          {TEST_TEXT}
        </Cell>
      )
      userEvent.click(screen.getAllByAltText('edit')[0])
      expect(handleClickEdit).toHaveBeenCalledTimes(1)
      expect(handleClickEdit.mock.results[0].value).toBe(TEST_ID)
    })

    test('onClickLabel', () => {
      const handleClickLabel = jest.fn((id) => id)
      render(
        <Cell id={TEST_ID} onClickLabel={handleClickLabel}>
          {TEST_TEXT}
        </Cell>
      )
      userEvent.click(screen.getByText(TEST_TEXT))
      expect(handleClickLabel).toHaveBeenCalledTimes(1)
      expect(handleClickLabel.mock.results[0].value).toBe(TEST_ID)
    })
  })

  test('gets a class', () => {
    const { container } = render(
      <Cell id={TEST_ID} className={TEST_CLASS}>
        {TEST_TEXT}
      </Cell>
    )
    expect(container.querySelector('.Cell')).toHaveClass(TEST_CLASS)
  })
})
