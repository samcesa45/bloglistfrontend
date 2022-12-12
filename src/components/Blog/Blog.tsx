import React, { useState, Dispatch, SetStateAction } from 'react'
import './blog.scss'
import { BlogProps, UserProps } from '../../types/types'
import Card from '../Card/Card'
import { blogService } from '../../services/blog'

type Props = {
    blog:BlogProps,
    user:UserProps | undefined,
    setUpdate: Dispatch<SetStateAction<number>>
}

const Blog = ({ blog,user,setUpdate }: Props) => {
  const [visible,setVisible] = useState(false)

  const toggleView = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = {
    display:visible ? 'none' :''
  }
  const showWhenVisible = {
    display:visible ? '' :'none'
  }

  const increaseLikes = async (event:React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    await blogService.update(blog.id, newBlog)
    setUpdate(Math.floor(Math.random() * 100))

  }

  const removeBlog = async (event:React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        if(user?.token){
          blogService.setToken(user?.token)
          await blogService.remove(blog.id, user?.token)
          setUpdate(Math.floor(Math.random() * 100))

        }
      }
    } catch (exception) {
      console.error(exception)
    }

  }
  return (
    <Card>
      <div  style={hideWhenVisible} className='blogTitle'>
        {blog.title} by {blog.author} <button className='view-btn' data-testid="view" onClick={toggleView}>view</button>
      </div>
      <div style={showWhenVisible} data-testid='show-div' className='show-div'>
        <div>{blog.title} <button className='hide-btn' onClick={toggleView}>hide</button></div>
        <div>{blog.url}</div>
        <div id="like">
          {blog.likes}<button type='submit' className='view-btn' onClick={increaseLikes} data-testid="likes">likes</button>
        </div>
        <div>{blog.author}</div>
        <button className='delete-btn' onClick={removeBlog}>remove</button>
      </div>
    </Card>
  )
}

export default Blog