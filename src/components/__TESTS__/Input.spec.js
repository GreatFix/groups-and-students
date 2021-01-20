import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Input from '../Input/Input'

const TEST_VALUE = 'TEST_VALUE',
  TEST_NAME = 'TEST_NAME',
  TEST_CLASS = 'TEST_NAME',
  TEST_ID = 'TEST_ID',
  TEST_LABEL = 'TEST_LABEL',
  TEST_PLACEHOLDER = 'TEST_PLACEHOLDER',
  TEST_TYPE = 'button',
  TEST_ERROR = 'TEST_ERROR'

describe('Input', () => {
  test('renders with name', () => {
    const { getByRole } = render(<Input name={TEST_NAME} />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  test('gets a class', () => {
    const { container } = render(<Input name={TEST_NAME} className={TEST_CLASS} />)
    const selectParent = container.querySelector('.Input')
    expect(selectParent).toHaveClass(TEST_CLASS)
  })

  test('gets a id', () => {
    const { container } = render(<Input name={TEST_NAME} id={TEST_ID} />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('id', TEST_ID)
  })

  test('gets a label with id', () => {
    const { container } = render(<Input name={TEST_NAME} id={TEST_ID} label={TEST_LABEL} />)
    const label = container.querySelector('label')
    const input = container.querySelector('input')
    expect(label).toHaveTextContent(TEST_LABEL)
    expect(input).toHaveAttribute('id', TEST_ID)
  })

  test('gets a value with onChange', () => {
    const mockOnChange = jest.fn()

    const { container } = render(
      <Input name={TEST_NAME} value={TEST_VALUE} onChange={mockOnChange} />
    )
    const input = container.querySelector('input')

    expect(input).toHaveValue(TEST_VALUE)
  })

  test('gets a placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input name={TEST_NAME} placeholder={TEST_PLACEHOLDER} />
    )
    expect(getByPlaceholderText(TEST_PLACEHOLDER)).toBeInTheDocument()
  })

  test('gets a type', () => {
    const { getByRole } = render(<Input name={TEST_NAME} type={TEST_TYPE} />)
    expect(getByRole(TEST_TYPE)).toBeInTheDocument()
  })

  test('gets a autoFocus', () => {
    const { container } = render(<Input name={TEST_NAME} autoFocus />)
    const input = container.querySelector('input')
    expect(input).toHaveFocus()
  })

  describe('Validate', () => {
    test('gets a validateError', () => {
      const { container } = render(<Input name={TEST_NAME} validateError={TEST_ERROR} />)
      const ValidateErrorMessage = container.querySelector('.ValidateErrorMessage')
      expect(ValidateErrorMessage).toBeInTheDocument()
    })

    test('set validate error class for input', () => {
      const { container } = render(<Input name={TEST_NAME} validateError={TEST_ERROR} />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('ValidateErrorBorder')
    })
  })

  test('calls onChange', () => {
    const mockOnChange = jest.fn((e) => e.target.value)
    const { container } = render(<Input name={TEST_NAME} onChange={mockOnChange} />)
    const input = container.querySelector('input')

    fireEvent.change(input, {
      target: {
        value: TEST_VALUE,
      },
    })

    expect(mockOnChange.mock.calls.length).toBe(1)
    expect(mockOnChange.mock.results[0].value).toBe(TEST_VALUE)
  })

  test('becomes required', () => {
    const { container } = render(<Input name={TEST_NAME} required />)
    const input = container.querySelector('input')

    expect(input).toBeRequired()
  })

  test('becomes disabled', () => {
    const { container } = render(<Input name={TEST_NAME} disabled />)
    const input = container.querySelector('input')

    expect(input).toBeDisabled()
  })

  test('render with all the props in addition to validateError', () => {
    const { container } = render(
      <Input
        name={TEST_NAME}
        id={TEST_ID}
        className={TEST_CLASS}
        label={TEST_LABEL}
        placeholder={TEST_PLACEHOLDER}
        type={TEST_TYPE}
        onChange={() => {}}
        value={TEST_VALUE}
        autoFocus
        required
        disabled
      />
    )
    const input = container.querySelector('input')

    expect(input).toMatchSnapshot()
  })
})
