import React, { useEffect, useState } from 'react'
import { formatMoney } from '../../ultils/helpers'
import { SelectQuantity } from '../../components'
import { updateCart } from '../../store/user/userSlice'
import withBaseComponent from '../../hocs/withBaseComponent'

const OrderItem = ({defaultQuantity=1, dispatch, color, price, title, thumbnail, pid}) => {
    const [ quantity , setQuantity ] = useState(() => defaultQuantity)
    const handleQuantity = (number) => {
      if (+number > 1) setQuantity(number)
    }
    const handleChangeQuantity = (flag) => {
      if (flag === 'minus' && quantity === 1) return
      if (flag === 'minus') setQuantity(prev => +prev - 1)
      if (flag === 'plus') setQuantity(prev => +prev + 1)
    }
useEffect(() => {
    dispatch(updateCart({ pid, quantity, color}))
}, [quantity])

  return (
    <div className='w-main mx-auto font-bold grid grid-cols-10 py-3 border-b'>
            {/* Sản phẩm */}
            <span className='w-full col-span-4 text-center'>
              <div className='flex gap-2 '>
                <img src={thumbnail} alt='thumb' className='w-36 h-36 object-cover'/>
                <div className='flex flex-col gap-3 items-start justify-center'>
                    <span className='text-emerald-700 text-sm'>{title}</span>    
                    <span className='text-[12px] '>{color}</span>
                    <span className='text-sm font-semibold'>{formatMoney(price) + 'đ'}</span>
                </div>
              </div>
            </span>
            {/* Số lượng */}
            <span className='w-full col-span-2'>
              <div className='flex items-center justify-center h-full'>
                <SelectQuantity 
                  quantity={quantity} 
                  handleQuantity={handleQuantity}
                  handleChangeQuantity={handleChangeQuantity}
                />
              </div>
            </span>
            {/* Remove */}
            <span className='col-span-1 w-full h-full flex items-center justify-center text-center'>Thực hiện</span>
            {/* Price */}
            <span className='col-span-3 w-full h-full flex items-center justify-end pr-6'>
              <span className='text-lg'>{formatMoney(price * quantity) + 'đ'}</span>
            </span>
        </div>
  )
}

export default withBaseComponent(OrderItem)
