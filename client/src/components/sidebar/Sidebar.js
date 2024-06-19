              //useState: để lưu giá trị, //useEffect: để gọi
import React, {memo} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { PiListDashesFill } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
const Sidebar = () => {
  const {danhmuc } = useSelector(state => state.app )
  // console.log(danhmuc);

  return (
    <div className='flex flex-col shadow-md rounded-md'>
      <span className='py-4 bg-emerald-700 text-white pl-6 uppercase flex gap-2 items-center '><PiListDashesFill/> danh mục</span>
      {danhmuc?.map(el => (
        <NavLink 
        key={(el.title)}
        to={(el.title)}
        className={({isActive}) => isActive ? 
        ' px-5 pt-[15px] pb-[14px] text-sm font-medium hover:text-emerald-700' : 
        'px-5 pt-[15px] pb-[14px] hover:text-emerald-700 ' }  
      >
        <div className='flex items-center gap-2'>
          <MdKeyboardArrowRight/>
          {el.title}
        </div>
        </NavLink>
      ))}
    </div>
  )
}


export default memo(Sidebar)