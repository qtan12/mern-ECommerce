import React, {useState} from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const { token } = useParams()
  const handleResetPassword = async () => {
    const response = await apiResetPassword({password, token})
    if (response.success){
      toast.success(response.mes)
    }else {
      toast.info(response.mes, {theme: 'colored'})
    }
  } 
  return (
    <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white  z-50 flex py-8 flex-col items-center'> 
        <div className='flex flex-col gap-4'>
          <label htmlFor='password'> Hãy nhập mật khẩu mới:</label>
          <input 
            type="text"
            id="password"
            className='w-[800px] pb-2 border-b outline-none placeholder:tetx-sm' 
            // placeholder='email@gmail.com'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='flex items-center justify-end w-full  gap-4'>
            <Button
              handleOnClick={handleResetPassword}
            >
              Gửi
            </Button>
          </div>
        </div>
      </div>
  )
}

export default ResetPassword