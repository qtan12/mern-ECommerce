import React, {memo, Fragment, useState} from 'react'
import logo from '../../assets/fox.png'
import { adminSidebar } from '../../ultils/Navigation'
import { NavLink, Link } from 'react-router-dom'
import clsx from 'clsx'
import { FaChevronDown } from 'react-icons/fa'
import { PiCaretRightBold } from "react-icons/pi";

const activedStyle = 'px-4 py-4 flex rounded-lg shadow-md items-center gap-2 hover:bg-emerald-500 '
const notActiveStyle = 'px-4 py-4 flex rounded-lg items-center gap-2 hover:bg-emerald-500'

const AdminSidebar = () => {
    const [actived, setActived] = useState([])
    const handleShowTabs = (tabID) => {
        if (actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
        else setActived(prev => [...prev, tabID])
    } 
    
  return (
    <div className=' h-full border py-8 bg-emerald-700'>
      <Link to={'/'} className='flex flex-col justify-center items-center gap-2 py-4'>
        <img src={logo} alt="logo" className='w-[110px] object-contain'/>
        <h1>Admin</h1>
      </Link>
      <div>
        {adminSidebar.map(el => (
            <Fragment key={el.id}>
                {el.type === 'SINGLE' && <NavLink 
                    to={el.path}
                    className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActiveStyle)}
                >
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                </NavLink>}
                {el.type === 'PARENT' && <div onClick={() => handleShowTabs(+el.id)} className='flex flex-col cursor-pointer'>
                    <div className='flex items-center justify-between px-4 py-4 hover:bg-emerald-500 rounded-lg'>
                        <div className='flex items-center gap-2'>
                            <span>{el.icon}</span>
                            <span>{el.text}</span>
                        </div>
                        {/* dấu mũi tên */}
                        {actived.some(id => id === el.id) ? <PiCaretRightBold/> : <FaChevronDown/>}
                    </div>
                    {/* submenu */}
                    {actived.some(id => id === el.id) && <div className='flex flex-col pl-8'>
                        {el.submenu?.map(item => (
                            <NavLink 
                                key={el.text} 
                                to={item.path}
                                onClick={e => e.stopPropagation()}
                                className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActiveStyle)}
                            >
                                {item.text}
                            </NavLink>
                        ))}
                    </div>}
                </div>}
                
            </Fragment>
        ))}
      </div>
    </div>
  )
}

export default memo(AdminSidebar)
