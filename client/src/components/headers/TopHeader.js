import React, {memo, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import { getCurrent } from '../../store/user/asyncActions'
import { useDispatch, useSelector} from 'react-redux'
import icons from '../../ultils/icons'
import { logout, clearMessage } from '../../store/user/userSlice'
import Swal from 'sweetalert2'
import withBaseComponent from '../../hocs/withBaseComponent'

const {IoMdLogOut} = icons

const TopHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoggedIn, current, mes} = useSelector(state => state.user)

  useEffect (() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent())
    }, 300)
    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [dispatch, isLoggedIn])
  
  // khi access token hết hạn 
  useEffect(() => {
    if (mes) Swal.fire('Oops', mes, 'info').then(() => {
      dispatch(clearMessage())
      navigate(`/${path.LOGIN}`)
    })
  }, [mes])
  return (
    <div className=' w-full bg-emerald-700 flex items-center justify-center '>
      <div className='w-main h-[100px] flex items-center justify-between text-xs text-white'>
        <span>MUA HÀNG ONLINE HOẶC GỌI TÔI (+84) 333352169</span>
        {isLoggedIn && current
        ? <div className='flex gap-4 text-sm items-center '>
          <span>{`Xin chào, ${current?.firstname} ${current?.lastname}`}</span>
          <span 
            onClick={() => dispatch(logout())}
            className='cursor-pointer hover:rounded-full hover:bg-gray-200 hover:text-emerald-700 p-2'>< IoMdLogOut size={24}/>
          </span>
        </div>
        : <Link className=' hover:text-gray-700 h-[25px] ' to={`/${path.LOGIN}`}>ĐĂNG NHẬP</Link>
        }
      </div>
    </div>
  )
}

export default withBaseComponent(memo(TopHeader))