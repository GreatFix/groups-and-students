import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Form from '../Form/Form'

const TEST_TEXT = 'TEST_TEXT'
const TEST_BUTTON_TEXT = 'TEST_BUTTON_TEXT'
const TEST_VALUE = 'TEST_VALUE'

describe('Form', () => {
  test('renders a children', () => {
    const { getByDisplayValue } = render(
      <Form submitText={TEST_BUTTON_TEXT} onSubmit={() => {}}>
        <input defaultValue={TEST_TEXT} />
      </Form>
    )
    expect(getByDisplayValue(TEST_TEXT)).toBeInTheDocument()
  })

  test('render submitText', () => {
    const { getByText } = render(
      <Form submitText={TEST_BUTTON_TEXT} onSubmit={() => {}}>
        <input defaultValue={TEST_TEXT} />
      </Form>
    )
    const submit = getByText(TEST_BUTTON_TEXT)
    expect(submit).toHaveAttribute('type', 'submit')
  })

  test('call onSubmit', () => {
    const mockOnSubmit = jest.fn((e) => e.target.value)
    const { getByText } = render(
      <Form submitText={TEST_BUTTON_TEXT} onSubmit={mockOnSubmit}>
        <input defaultValue={TEST_TEXT} />
      </Form>
    )
    const submit = getByText(TEST_BUTTON_TEXT)
    fireEvent.submit(submit, {
      target: {
        value: TEST_VALUE,
      },
    })

    expect(mockOnSubmit.mock.calls.length).toBe(1)
    expect(mockOnSubmit.mock.results[0].value).toBe(TEST_VALUE)
  })

  test('render properly', () => {
    const { container } = render(
      <Form submitText={TEST_BUTTON_TEXT} onSubmit={() => {}}>
        <input defaultValue={TEST_TEXT} />
      </Form>
    )
    expect(container).toMatchSnapshot()
  })
})
