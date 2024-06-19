import React from 'react'
import { Sidebar, Banner, BestSeller, Uudaimoingay, FeatureProduct, CustomSlider  } from '../../components'
import {useSelector } from 'react-redux'
import icons from '../../ultils/icons'
import { createSearchParams, Link } from 'react-router-dom'
import withBaseComponent from '../../hocs/withBaseComponent'

const {IoIosArrowForward} = icons 

const Trangchu = ({navigate}) => {
  const {newProducts} = useSelector(state => state.products)
  const {danhmuc} = useSelector(state => state.app)
  const {isLoggedIn, current} = useSelector(state => state.user)
  console.log({isLoggedIn, current})
  return (
    <>
      <div className='w-main flex mt-6'>
        <div className='flex flex-col gap-8 w-[25%] flex-auto'>
          <Sidebar/>
          <Uudaimoingay/>
        </div>
        <div className='flex flex-col gap-8 pl-5 w-[75%] flex-auto'>
          <Banner/>
          <BestSeller/>
        </div>
    </div>
    <div className='my-8'>
      <FeatureProduct/>
    </div>

    <div className=' w-main '>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-emerald-700 ' >SẢN PHẨM MỚI </h3>
      <div className='mt-4 mx-[-10px]'>
        <CustomSlider
          product={newProducts}
        />
          
      </div>
    </div>
    <div className=' w-main'>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-emerald-700'> SƯU TẬP HOT</h3>
      <div className='flex flex-wrap gap-4 '>
        {danhmuc?.filter(el=> el.brand.length > 0)?.map(el => (
          <div
            key={el._id}
            className = 'w-1/4 flex-auto'
          >
            {/* SƯU TẬP HOT */}
            <div className=' flex gap-4 p-4 mt-4 min-h-[200px] hover:scale-105 shadow-md rounded-md'>
              <img src={el?.image} alt="" className='w-[144px] h-[129px] object-cover'/>
              <div className='flex-1 text-gray-800'>
                <h4 className='font-semibold uppercase'>{el?.title}</h4>
                <ul className='text-sm'>
                  {el?.brand?.map((item) => (
                    <span
                      key={item} 
                      onClick={() => navigate({
                        pathname: `/${el?.title}`,
                        search: createSearchParams({brand: item}).toString(),
                      })}
                      className='flex cursor-pointer hover:underline hover:text-emerald-700 gap-1 items-center text-gray-500'
                    >
                      <IoIosArrowForward size ={14}/>
                      <li>{item}</li>
                    </span>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className=' w-main my-8 '>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-emerald-700'> BlOG POSTS</h3>
    </div>
  
    </>
  )
}

export default withBaseComponent(Trangchu)