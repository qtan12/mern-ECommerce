import React, {memo} from 'react'

const SelectQuantity = ({quantity, handleQuantity, handleChangeQuantity}) => {
  return (
    <div className='flex items-center bg-gray-200 '>
        <span onClick={() => handleChangeQuantity('minus')} className='hover:bg-gray-500 p-3 cursor-pointer border-r border-black'>-</span>
        <input 
            type="text" 
            className='py-3 w-[50px] text-center'
            value={quantity}
            onChange={e => handleQuantity(e.target.value)}
            />
        <span onClick={() => handleChangeQuantity('plus')} className='hover:bg-gray-500 p-3 cursor-pointer border-l border-black'>+</span>

    </div>
  )
}

export default memo(SelectQuantity)