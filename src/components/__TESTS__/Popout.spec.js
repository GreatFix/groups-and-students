import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Popout from '../Popout/Popout'

const TEST_TEXT = 'TEST_TEXT'
const TEST_CLASS = 'TEST_NAME'

describe('Popout', () => {
  test('renders with children', () => {
    const { getByText } = render(
      <Popout onClose={() => {}}>
        <p>{TEST_TEXT}</p>
      </Popout>
    )

    expect(getByText(TEST_TEXT)).toBeInTheDocument()
  })

  test('gets a class', () => {
    const { container } = render(
      <Popout onClose={() => {}} className={TEST_CLASS}>
        {TEST_TEXT}
      </Popout>
    )
    const popout = container.querySelector('.Popout')
    expect(popout).toHaveClass(TEST_CLASS)
  })

  test('click on close', () => {
    const handleClickClose = jest.fn()
    const { container } = render(<Popout onClose={handleClickClose}>{TEST_TEXT}</Popout>)
    const button = container.querySelector('.Close')

    userEvent.click(button)
    expect(handleClickClose.mock.calls.length).toBe(1)
  })
})
