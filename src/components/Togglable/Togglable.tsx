import { forwardRef, useImperativeHandle, useState } from 'react'
import './togglable.scss'

type Props = {
    children:React.ReactNode,
    btnLabel:string
}

const Togglable = forwardRef(({ children,btnLabel }: Props,refs) => {
  const [visible,setVisible] = useState(false)
  const hideWhenVisible = {
    display:visible ? 'none' : ''
  }
  const showWhenVisible = {
    display:visible ? '' : 'none'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='btn-hide' onClick={toggleVisibility}>{btnLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button className='btn-show' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable