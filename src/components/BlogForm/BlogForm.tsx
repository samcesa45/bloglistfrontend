import React, { useState } from 'react'
import { BlogProps } from '../../types/types'
import './blogform.scss'

type Props = {
    createBlog:(value:BlogProps)=>void
}

const BlogForm = ({ createBlog }: Props) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(event.target.value)
  }

  const handleAddBlog = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(newTitle.length === 0 || newAuthor.length === 0 || newUrl.length === 0) return

    createBlog({
      id:'',
      title:newTitle,
      author:newAuthor,
      url:newUrl,
      likes:0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div className='create-container'>
      <h2>Create New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div className="form-outline">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className='form-control'
            name='title'
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-outline">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className='form-control'
            name='author'
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div className="form-outline">
          <label htmlFor="url" className="form-label">Url</label>
          <input
            type="text"
            className='form-control'
            name='url'
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <div className='btn-container'>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>

  )
}

export default BlogForm