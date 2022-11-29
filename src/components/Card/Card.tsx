import React from 'react'
import './card.scss'
type Props = {
    children:React.ReactNode
}

const Card = ({ children }: Props) => {
  return (
    <div className='card-wrapper'>{children}</div>
  )
}

export default Card