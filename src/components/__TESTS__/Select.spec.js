import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Select from '../Select/Select'

const OPTION_1 = 'option_1',
  OPTION_2 = 'option_2',
  OPTION_3 = 'option_3',
  TEST_NAME = 'TEST_NAME',
  TEST_CLASS = 'TEST_NAME',
  TEST_ID = 'TEST_ID',
  TEST_LABEL = 'TEST_LABEL'

describe('Select', () => {
  const array = [OPTION_1, OPTION_2, OPTION_3]

  test('renders with options', () => {
    const { getByText } = render(<Select name={TEST_NAME} options={array} />)
    expect(getByText(OPTION_1)).toBeInTheDocument()
    expect(getByText(OPTION_2)).toBeInTheDocument()
    expect(getByText(OPTION_3)).toBeInTheDocument()
  })

  test('gets a class', () => {
    const { container } = render(<Select name={TEST_NAME} className={TEST_CLASS} options={array} />)
    const selectParent = container.querySelector('.Select')
    expect(selectParent).toHaveClass(TEST_CLASS)
  })

  test('selects option', () => {
    const { container, getByText } = render(<Select name={TEST_NAME} options={array} />)
    const select = container.querySelector('select')
    userEvent.selectOptions(select, [OPTION_3])

    expect(getByText(OPTION_1).selected).toBe(false)
    expect(getByText(OPTION_2).selected).toBe(false)
    expect(getByText(OPTION_3).selected).toBe(true)
  })

  test('gets a id', () => {
    const { container } = render(<Select name={TEST_NAME} id={TEST_ID} />)
    const select = container.querySelector('select')
    expect(select).toHaveAttribute('id', TEST_ID)
  })

  test('gets a name', () => {
    const { container } = render(<Select name={TEST_NAME} options={array} />)
    const select = container.querySelector('select')
    expect(select).toHaveAttribute('name', TEST_NAME)
  })

  test('gets a label with id', () => {
    const { container } = render(
      <Select name={TEST_NAME} id={TEST_ID} label={TEST_LABEL} options={array} />
    )
    const label = container.querySelector('label')
    const select = container.querySelector('select')
    expect(label).toHaveTextContent(TEST_LABEL)
    expect(select).toHaveAttribute('id', TEST_ID)
  })

  test('gets a value with onChange', () => {
    const mockOnChange = jest.fn()

    const { container, getByText } = render(
      <Select name={TEST_NAME} value={OPTION_2} onChange={mockOnChange} options={array} />
    )
    const select = container.querySelector('select')

    expect(select).toHaveValue(OPTION_2)
    expect(getByText(OPTION_1).selected).toBe(false)
    expect(getByText(OPTION_2).selected).toBe(true)
    expect(getByText(OPTION_3).selected).toBe(false)
  })

  test('gets a defaultValue', () => {
    const { container, getByText } = render(
      <Select name={TEST_NAME} defaultValue={OPTION_2} options={array} />
    )
    const select = container.querySelector('select')
    expect(select).toHaveValue(OPTION_2)
    expect(getByText(OPTION_1).selected).toBe(false)
    expect(getByText(OPTION_2).selected).toBe(true)
    expect(getByText(OPTION_3).selected).toBe(false)
  })

  test('calls onChange', () => {
    const mockOnChange = jest.fn((e) => e.target.value)
    const { container, getByText } = render(
      <Select name={TEST_NAME} onChange={mockOnChange} options={array} />
    )
    const select = container.querySelector('select')

    fireEvent.change(select, {
      target: {
        value: OPTION_3,
      },
    })

    expect(mockOnChange.mock.calls.length).toBe(1)
    expect(mockOnChange.mock.results[0].value).toBe(OPTION_3)
    expect(getByText(OPTION_1).selected).toBe(false)
    expect(getByText(OPTION_2).selected).toBe(false)
    expect(getByText(OPTION_3).selected).toBe(true)
  })

  test('becomes required', () => {
    const { container } = render(<Select name={TEST_NAME} options={array} required />)
    const select = container.querySelector('select')

    expect(select).toBeRequired()
  })

  test('becomes disabled', () => {
    const { container } = render(<Select name={TEST_NAME} options={array} disabled />)
    const select = container.querySelector('select')

    expect(select).toBeDisabled()
  })

  test('render with all the props in addition to defaultValue', () => {
    const { container } = render(
      <Select
        name={TEST_NAME}
        options={array}
        id={TEST_ID}
        className={TEST_CLASS}
        label={TEST_LABEL}
        onChange={() => {}}
        value={OPTION_2}
        required
        disabled
      />
    )
    const select = container.querySelector('select')

    expect(select).toMatchSnapshot()
  })
})
