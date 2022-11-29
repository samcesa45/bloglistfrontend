
import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog/Blog'
import LoginForm from './components/LoginForm/LoginForm'
import Notification from './components/Notification/Notification'
import { blogService } from './services/blog'
import { loginService } from './services/login'
import { BlogProps, NotificationProps, UserProps } from './types/types'
import './app.scss'
import BlogForm from './components/Blog/BlogForm'
import Togglable from './components/Togglable/Togglable'
type toggleVisibilityProps = {
  toggleVisibility:()=>void
}

const App = () => {
  const [blogs,setBlogs] = useState<BlogProps[]>([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errorMessage,setErrorMessage] = useState<NotificationProps | null>({
    error:'',
    success:''
  })
  const [user,setUser] = useState<UserProps | null>(null)
  const [update,setUpdate] = useState<number | null>(null)
  const blogFormRef = useRef<null | toggleVisibilityProps>(null)

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        console.log(initialBlogs)

        setBlogs(initialBlogs)
      })
      .catch(err => console.error(err)
      )
  },[update])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loginbloguser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const handleUsernameChange=(event:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange=(event:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }


  const addBlog = async (newBlog:BlogProps) => {

    try {
      const returnedBlog = await blogService.create(newBlog)
      if(blogFormRef.current){
        blogFormRef.current.toggleVisibility()
      }
      setBlogs([...blogs,returnedBlog])
      setErrorMessage({ ...errorMessage,error:'',success:`a new blog ${newBlog.title} by ${newBlog.author} added` })
      setTimeout(() => {
        setErrorMessage(null)
      },5000)

    } catch (exception) {
      setErrorMessage({ ...errorMessage,error:'oops something went wrong!',success:'' })
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }

  }

  const handleLogin = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username,password })
      window.localStorage.setItem(
        'loginbloguser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMessage({ ...errorMessage,error:'wrong username or password',success:'' })
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }


  }

  const logout=() => {
    window.localStorage.clear()
  }

  const allBlogs = () => {
    return blogs.sort((a,b) => b.likes - a.likes).map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        setUpdate={setUpdate}
        user={user}
      />
    ))
  }

  return (
    <div>
      <Notification message={errorMessage}/>
      {user === null
        ? <LoginForm
          username={username}
          password={password}
          onChangeUsername={handleUsernameChange}
          onChangePassword={handlePasswordChange}
          onLogin={handleLogin}

        />
        :
        <div>
          <h2>Blogs</h2> <span onClick={logout} className='logout'>Logout</span>
          <p>{user.name} logged-in</p>
          <div>
            <Togglable btnLabel="new blog" ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
              />
            </Togglable>
          </div>
          {allBlogs()}
        </div>
      }

    </div>
  )
}

export default App
