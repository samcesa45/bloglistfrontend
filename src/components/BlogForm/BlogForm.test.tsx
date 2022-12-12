import '@testing-library/react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm/> form calls the event handler received as props with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog}/>)
  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Create')
  await user.type(inputs[0], 'This is a test title')
  await user.type(inputs[1], 'This is a test author')
  await user.type(inputs[2], 'This is a test url')
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is a test title')
  expect(createBlog.mock.calls[0][0].author).toBe('This is a test author')
  expect(createBlog.mock.calls[0][0].url).toBe('This is a test url')
})