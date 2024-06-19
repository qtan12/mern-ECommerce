import React, {memo} from 'react'
import banner from '../../assets/banner.jpg'
const Banner = () => {
  return (
    <div className='w-full'>
      <img src={banner} alt="Banner" className='h-[376px] w-full hover:scale-95 object-cover'/>
      
    </div>
  )
}

export default memo(Banner)