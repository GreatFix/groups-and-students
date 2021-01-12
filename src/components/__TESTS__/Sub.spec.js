import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Sub from '../Sub/Sub'

const TEST_TEXT = 'May the force be with you'
const TEST_CLASS = 'TEST_CLASS'

describe('Sub', () => {
  test('renders a text', () => {
    const { getByText } = render(<Sub>{TEST_TEXT}</Sub>)
    expect(getByText(TEST_TEXT)).toBeInTheDocument()
  })

  test('gets a class', () => {
    const { container } = render(<Sub className={TEST_CLASS}>{TEST_TEXT}</Sub>)
    expect(container.querySelector('.Sub')).toHaveClass(TEST_CLASS)
  })

  test('render properly', () => {
    const { container } = render(<Sub>{TEST_TEXT}</Sub>)
    expect(container).toMatchSnapshot()
  })
})
