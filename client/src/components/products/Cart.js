
import React, { memo } from 'react'

import { GrClose } from "react-icons/gr";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apiRemoveCart } from '../../apis';
import withBaseComponent from '../../hocs/withBaseComponent';
import { showCart } from '../../store/app/appSlice';
import { getCurrent } from '../../store/user/asyncActions';
import { formatMoney } from '../../ultils/helpers';
import Button from '../button/Button';
import path from '../../ultils/path'

const Cart = ({dispatch, navigate}) => {
    const { currentCart } = useSelector(state => state.user)
    const removeCart = async(pid, color) => {
        const response = await apiRemoveCart(pid, color)
      if (response.success) {
        dispatch(getCurrent())
      }else toast.error(response.mes)
    }
  return (
    <div
        onClick={e => e.stopPropagation()} 
        className=' w-[800px] h-sceen bg-[#060C2C] grid grid-rows-10  grid-rows-layout text-white p-6'>
        <header className='row-span-1 h-full flex justify-between items-center  border-b font-bold text-2xl'>
            <span>Đơn hàng của bạn</span>
            <span onClick={() => dispatch(showCart())} className='p-2 cursor-pointer'> <GrClose size={24}/> </span>
        </header>
        <section className='row-span-6 h-full flex flex-col gap-3 max-h-[80vh] overflow-y-auto py-3'>
            {!currentCart && <span className='text-xs italic '>Giỏ hàng trống</span>}
            {currentCart && currentCart?.map(el => (
                <div key={el._id} className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <img src={el.thumbnail || el.thumb} alt='thumb' className='w-16 h-18 object-cover'/>
                        <div className='flex flex-col gap-2 '>
                            <span className='text-emerald-700 text-sm'>{el.title}</span>
                            <span className='text-[12px] '>{el.color}</span>
                            <span className='text-sm font-semibold'>{formatMoney(el.price) + 'đ'}</span>
                        </div>
                    </div>
                    <span className='justify-center items-center flex text-[12px]'>{`Số lượng: ${el.quantity}`}</span>
                    <span
                        onClick={() => removeCart(el?.product?._id, el.color )} 
                        className=' rounded-full hover:bg-red-700 cursor-pointer h-10 w-10 justify-center items-center flex '><RiDeleteBin6Line size={20}/>
                    </span>
                </div>
            ))}
        </section>
        
        <div className='row-span-3 h-full gap-16 justify-between '>
            <div className='flex items-center my-4 justify-between border-t pt-4'>
                <span>Tổng giá:</span>
                <span>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el.price) * el.quantity, 0)) + 'đ'}</span>
            </div>
            <span className=' text-gray-600 italic text-sm'>Vận chuyển, giảm giá được tính khi thanh toán.</span>
            <Button handleOnClick={() => {
                dispatch(showCart())
                navigate(`/${path.DETAIL_CART}`) 
            }} 
                style='rounded-none w-full py-3 bg-emerald-700'>Chi tiết giỏ hàng</Button>
        </div>
    </div>
  )
}

export default withBaseComponent(memo(Cart))
