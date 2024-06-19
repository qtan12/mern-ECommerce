import React from 'react'
import { Outlet } from 'react-router-dom' // component con của Public trong file App 
import { Hearder, Navigation, TopHeader, Footer } from '../../components' 


const Public = () => {
  return (
    <div className='max-h-screen overflow-y-auto flex flex-col items-center '>
        <TopHeader/>
        <Hearder/>
        <Navigation/>
      <div className='w-full flex flex-col items-center'>
          <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Public