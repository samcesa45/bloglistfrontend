
import { NotificationProps } from '../../types/types'
import './notification.scss'
type Props = {
    message:NotificationProps | null
}

const Notification = ({message}: Props) => {
    if(message === null) return null
    if(message.error){
     return  <div className='error'>{message.error}</div>
    }
    if(message.success){
     return  <div className='success'>{message.success}</div>
    }
    return null
}

export default Notification