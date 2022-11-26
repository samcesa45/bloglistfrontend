import React from 'react'
import './blog.scss'
import { BlogProps } from '../../types/types'

type Props = {
    blog:BlogProps
}

const Blog = ({blog}: Props) => {
  return (
    <div>{blog.title} <b>{blog.author}</b></div>
  )
}

export default Blog