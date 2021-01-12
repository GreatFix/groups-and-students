import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Spinner from '../Spinner/Spinner'

describe('Spinner', () => {
  test('render', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('.Spinner')).toMatchSnapshot()
  })
})
