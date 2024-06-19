import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../ultils/path'
import { useSelector} from 'react-redux/es/hooks/useSelector'
import { AdminSidebar } from '../../components'

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user)
  if (!isLoggedIn || !current || +current.role === '2002' ) return <Navigate to={`/${path.LOGIN}`} replace={true} /> 
  return (
    <div className='flex w-full min-h-screen text-white relative bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
      <div className=' w-[330px] flex-none top-0 bottom-0 fixed'>
        <AdminSidebar/>
      </div>

      <div className='w-[330px]'></div>

      <div className='flex-auto'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout
