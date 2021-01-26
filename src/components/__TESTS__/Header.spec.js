import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from '../Header/Header'

const TEST_TEXT = 'May the force be with you'
const TEST_CLASS = 'TEST_CLASS'

describe('Header', () => {
  test('renders a text', () => {
    const { getByText } = render(<Header>{TEST_TEXT}</Header>)
    expect(getByText(TEST_TEXT)).toBeInTheDocument()
  })

  test('gets a class', () => {
    const { container } = render(<Header className={TEST_CLASS}>{TEST_TEXT}</Header>)
    expect(container.querySelector('.Header')).toHaveClass(TEST_CLASS)
  })

  test('render properly', () => {
    const { container } = render(<Header>{TEST_TEXT}</Header>)
    expect(container).toMatchSnapshot()
  })
})
