import React, {memo} from 'react'
import { Link } from 'react-router-dom'
import { renderStar, formatMoney } from '../../ultils/helpers'

const CardProduct = ({price, totalRatings, title, image, pid, category}) => {
  return (
    <Link
      to={`/${category?.toLowerCase()}/${pid}/${title}`}
      className='w-1/3 flex-auto cursor-pointer px-[10px] mb-[20px] '>
        <div className='flex w-full hover:scale-105 shadow-lg rounded'>
            <img src={image} alt="products" className='w-[150px] object-contain p-4' />

            {/* sao đáng giá, giá tiền */}
            <div className='flex flex-col gap-1 mt-[15px] items-start w-full text-xs'>
                <span className='line-clamp-1 text-sm capitalize'>{title?.toLowerCase()}</span>
                <span className='flex h-4 '> {renderStar(totalRatings, 14)?.map((el, index) => (
                  <span key={index}> {el} </span>
                ))} </span>
                <span>{`${formatMoney(price)} VNĐ`}</span>
            </div>
        </div>
    </Link>
  )
}

export default memo(CardProduct)