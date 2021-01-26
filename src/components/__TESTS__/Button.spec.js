import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Button from '../Button/Button'

const TEST_COLOR = 'success'
const TEST_TYPE = 'reset'
const TEST_CLASS = 'TEST_CLASS'
const TEST_TEXT = 'TEST_TEXT'
const TEST_VALUE = 'TEST_VALUE'

describe('Button', () => {
  test('render with children', () => {
    const { getByRole } = render(<Button>{TEST_TEXT}</Button>)

    expect(getByRole('button')).toBeInTheDocument()
    expect(getByRole('button')).toHaveTextContent(TEST_TEXT)
  })

  test('render with color', () => {
    const { getByRole } = render(<Button color={TEST_COLOR}>{TEST_TEXT}</Button>)
    expect(getByRole('button')).toHaveStyle(`background-color: #40C81E`)
  })

  test('render with type', () => {
    const { getByRole } = render(<Button type={TEST_TYPE}>{TEST_TEXT}</Button>)
    expect(getByRole('button')).toHaveAttribute('type', TEST_TYPE)
  })

  test('render with disabled', () => {
    const { getByRole } = render(<Button disabled>{TEST_TEXT}</Button>)
    expect(getByRole('button')).toBeDisabled()
  })

  test('render with className', () => {
    const { getByRole } = render(<Button className={TEST_CLASS}>{TEST_TEXT}</Button>)
    expect(getByRole('button')).toHaveClass(TEST_CLASS)
  })

  test('calls onClick', () => {
    const mockOnClick = jest.fn((e) => e.target.value)
    const { getByRole } = render(<Button onClick={mockOnClick}> {TEST_TEXT}</Button>)

    fireEvent.click(getByRole('button'), {
      target: {
        value: TEST_VALUE,
      },
    })

    expect(mockOnClick.mock.calls.length).toBe(1)
    expect(mockOnClick.mock.results[0].value).toBe(TEST_VALUE)
  })

  test('render properly', () => {
    const { getByRole } = render(
      <Button
        className={TEST_CLASS}
        color={TEST_COLOR}
        type={TEST_TYPE}
        onClick={() => {}}
        disabled
      >
        {TEST_TEXT}
      </Button>
    )
    expect(getByRole('button')).toMatchSnapshot()
  })
})
