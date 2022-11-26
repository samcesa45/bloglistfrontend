import React from 'react'
import './loginform.scss'

type Props = {
  username:string,
  password:string,
  onChangeUsername:(event:React.ChangeEvent<HTMLInputElement>)=>void,
  onChangePassword:(event:React.ChangeEvent<HTMLInputElement>)=>void,
  onLogin:(event:React.FormEvent<HTMLFormElement>)=>void
}

const LoginForm = ({username,password,onChangeUsername,onChangePassword,onLogin}: Props) => {
  return (
    <div className='container'>
      <form onSubmit={onLogin}>
        <h1>Sign in</h1>
        <div className='form-outline'>
          <label className='form-label' htmlFor="username">Username</label>
          <input 
          className='form-control' 
          type='text' 
          name='username' 
          value={username}
          onChange={(event)=>onChangeUsername(event)}
          id='username' 
          style={{marginBottom:'15px'}}
          />
        </div>
        <div className='form-outline'>
          <label className='form-label' htmlFor="password">Password</label>
          <input 
          className='form-control' 
          type='password' 
          name='password' 
          value={password}
          onChange={(event)=>onChangePassword(event)}
          id='password'
          />
        </div>
        <div className='btn-container'>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm