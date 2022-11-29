import React, { useState, Dispatch, SetStateAction } from 'react'
import './blog.scss'
import { BlogProps, UserProps } from '../../types/types'
import Card from '../Card/Card'
import { blogService } from '../../services/blog'

type Props = {
    blog:BlogProps,
    user:UserProps | null,
    setUpdate: Dispatch<SetStateAction<number | null>>
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
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      if(user?.token){
        blogService.setToken(user?.token)
        await blogService.remove(blog.id, user?.token)
        setUpdate(Math.floor(Math.random() * 100))

      }
    }

  }
  return (
    <Card>
      {blog.title} <b>{blog.author}</b>
      <div  style={hideWhenVisible}>
        <button className='view-btn' onClick={toggleView}>view more</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <button type='submit' className='view-btn' onClick={increaseLikes}>{blog.likes}</button> <span>likes</span>
        {user === null ? '' : <button className='delete-btn' onClick={removeBlog}>remove</button>}
        <button className='hide-btn' onClick={toggleView}>hide</button>
      </div>

    </Card>
  )
}

export default Blog