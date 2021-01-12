import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import SimpleCell from '../SimpleCell/SimpleCell'

const TEST_TEXT = 'May the force be with you'
const TEST_CLASS = 'TEST_CLASS'

describe('SimpleCell', () => {
  test('renders a text', () => {
    const { getByText } = render(<SimpleCell>{TEST_TEXT}</SimpleCell>)
    expect(getByText(TEST_TEXT)).toBeInTheDocument()
  })

  test('gets a class', () => {
    const { container } = render(<SimpleCell className={TEST_CLASS}>{TEST_TEXT}</SimpleCell>)
    expect(container.querySelector('.SimpleCell')).toHaveClass(TEST_CLASS)
  })

  test('onClick with onClick', () => {
    const handleClick = jest.fn()
    const { container } = render(<SimpleCell onClick={handleClick}>{TEST_TEXT}</SimpleCell>)
    userEvent.click(container.querySelector('.SimpleCell'))
    expect(handleClick.mock.calls.length).toBe(1)
  })

  test('render properly', () => {
    const { container } = render(<SimpleCell>{TEST_TEXT}</SimpleCell>)
    expect(container).toMatchSnapshot()
  })
})
