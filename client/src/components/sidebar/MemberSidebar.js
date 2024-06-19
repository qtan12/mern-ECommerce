import React, {memo, Fragment, useState} from 'react'
import avatar from '../../assets/avtDefaul.png'
import { memberSidebar } from '../../ultils/Navigation'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { FaChevronDown } from 'react-icons/fa'
import { PiCaretRightBold } from "react-icons/pi";
import { useSelector } from 'react-redux'
import { IoReturnUpBack } from 'react-icons/io5'


const activedStyle = 'px-4 py-4 flex rounded-lg shadow-md items-center gap-2 hover:bg-emerald-500 '
const notActiveStyle = 'px-4 py-4 flex rounded-lg items-center gap-2 hover:bg-emerald-500'

const MemberSidebar = () => {
    const [actived, setActived] = useState([])
    const { current } = useSelector(state => state.user)
    const handleShowTabs = (tabID) => {
        if (actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
        else setActived(prev => [...prev, tabID])
    } 
    
  return (
    <div className=' h-full border py-8 bg-emerald-700'>
      <div className='w-full flex flex-col gap-2 items-center justify-center py-4'>
        <img src={current?.avatar || avatar } alt="logo" className='w-20 h-20 object-contain rounded-full'/>
        <small>{`${current?.firstname} ${current?.lastname}`}</small>
      </div>
      <div>
        {memberSidebar.map(el => (
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
        <NavLink to={'/'} className={clsx(notActiveStyle)}> <IoReturnUpBack size={24}/> Về cửa hàng</NavLink>
      </div>
    </div>
  )
}

export default memo(MemberSidebar)
