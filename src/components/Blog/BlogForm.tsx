import React from 'react'
import './blogform.scss'

type Props = {
    title:string, 
    author:string,
    url:string,
    onTitleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    onAuthorChange:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    onUrlChange:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    onAddBlog:(event:React.FormEvent<HTMLFormElement>)=>void
}

const BlogForm = ({onAddBlog, title, author, url,onTitleChange,onAuthorChange,onUrlChange}: Props) => {
  return (
      <div className='create-container'>
        <h2>Create New Blog</h2>
        <form onSubmit={onAddBlog}>
            <div className="form-outline">
                <label htmlFor="title" className="form-label">Title</label>
                <input 
                type="text" 
                className='form-control' 
                name='title'
                 id='title'
                 value={title}
                 onChange={(e)=>onTitleChange(e)}
                 />
            </div>
            <div className="form-outline">
                <label htmlFor="author" className="form-label">Author</label>
                <input 
                type="text" 
                className='form-control' 
                name='author' 
                id='author'
                value={author}
                onChange={(e)=>onAuthorChange(e)}
                />
            </div>
            <div className="form-outline">
                <label htmlFor="url" className="form-label">Url</label>
                <input 
                type="text" 
                className='form-control' 
                name='url' 
                id='url'
                value={url}
                onChange={(e)=>onUrlChange(e)}
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