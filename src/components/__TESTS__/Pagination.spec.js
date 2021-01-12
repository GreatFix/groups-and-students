import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Pagination from '../Pagination/Pagination'

const TEST_CLASS = 'TEST_CLASS'
const SIZE = 10

describe('Pagination', () => {
  test('renders buttons in the number of size', () => {
    const { container } = render(<Pagination size={SIZE} onClick={() => {}} />)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBe(SIZE)
  })

  test('gets a class', () => {
    const { container } = render(
      <Pagination size={SIZE} onClick={() => {}} className={TEST_CLASS} />
    )
    const pagination = container.querySelector('.Pagination')
    expect(pagination).toHaveClass(TEST_CLASS)
  })

  test('clicks on buttons', () => {
    const handleClick = jest.fn((number) => number)
    const { container } = render(<Pagination size={SIZE} onClick={handleClick} />)
    const buttons = container.querySelectorAll('button')

    userEvent.click(buttons[0])
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick.mock.results[0].value).toBe(1)

    userEvent.click(buttons[3])
    expect(handleClick).toHaveBeenCalledTimes(2)
    expect(handleClick.mock.results[1].value).toBe(4)

    userEvent.click(buttons[9])
    expect(handleClick).toHaveBeenCalledTimes(3)
    expect(handleClick.mock.results[2].value).toBe(10)
  })

  test('render properly', () => {
    const { container } = render(<Pagination size={SIZE} onClick={() => {}} />)
    expect(container).toMatchSnapshot()
  })
})
