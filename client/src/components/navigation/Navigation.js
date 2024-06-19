import React, {memo} from 'react'
import { navigation } from '../../ultils/Navigation'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='w-main h-[48px] py-4 y  text-sm flex items-center shadow-md rounded-md '>
      {navigation.map(el => (
        <NavLink 
          to={el.path}
          key={el.id}
          className= {({isActive}) => isActive ? 'pr-12 hover:text-emerald-700 text-emerald-700': 'pr-12 hover:text-emerald-700'}
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  )
}

export default memo(Navigation)