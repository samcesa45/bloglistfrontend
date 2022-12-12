
import '@testing-library/jest-dom'
import { screen, fireEvent, render } from '@testing-library/react'
import Blog from '../Blog'



const blog = {
  id:'',
  title:'You are not gonna need it',
  author:'Ron Jefferies',
  url:'https://ron.com',
  likes:0

}

const user={
  username:'testusername',
  name:'testname',
  password:'testpassword',
  token:'xyz'

}

const setUpdate = jest.fn()




test('default view, can only see title and author', () => {
  const { container } = render (<Blog
    blog={blog}
    user={user}
    setUpdate={setUpdate}
  />)

  const div = container.querySelector('.blogTitle')
  expect(div).toBeDefined()
  expect(div).toBeVisible()
  expect(div).toHaveTextContent(`${blog.title} by ${blog.author}`)
})

test('click view button can see blog detail', () => {
  const { container } = render (<Blog
    blog={blog}
    user={user}
    setUpdate={setUpdate}
  />)

  const buttonView = screen.getByTestId('view')
  fireEvent.click(buttonView)
  screen.debug()

  const allBlog = container.querySelector('.show-div')
  expect(allBlog).toBeVisible()
  expect(allBlog).toHaveTextContent(`${blog.url}`)
  expect(allBlog).toHaveTextContent(`${blog.likes}`)
  expect(allBlog).toHaveTextContent(`${blog.author}`)
  // expect(allBlog).toHaveTextContent('You are not gonna need it hidehttps://ron.com0likesRon Jefferiesremove')
})



test('if like button is clicked twice, the event handler the component recieved as props is called twice',  () => {
  const mockHandler = jest.fn()
  const { container } = render (<Blog
    blog={blog}
    user={user}
    setUpdate={setUpdate}
  />)

  const buttonView = screen.getByTestId('view')

  fireEvent.click(buttonView)


  const showDiv = container.querySelector('.show-div')
  expect(showDiv).toBeVisible()

  const buttonLike = screen.getByTestId('likes')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)


  expect(mockHandler.mock.calls).toHaveLength(2)
})

