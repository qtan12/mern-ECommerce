import React, {memo} from 'react'
import avatar from '../../assets/avtDefaul.png'
import moment from 'moment'
import { renderStar } from '../../ultils/helpers'

const Comment = ({image=avatar, name='Ẩn danh', updatedAt, comment, star}) => {
  return (
    <div className='flex gap-1 pb-20  '>
        <div className='flex-none'>
            <img src={image} alt='avatar' className='w-[25px] h-[25px] object-contain rounded'/>
        </div>
        <div className='flex flex-col flex-auto mb-8  '> 
            <div className='flex justify-between items-center'>
              <h3 className='font-medium'>{name}</h3>
              <span className='text-xs italic '>{moment(updatedAt)?.fromNow()}</span>
            </div>
            {/*  */}
            <div className='w-[760px] pr-8 pl-4 pt-4 pb-20 flex flex-col gap-2 text-sm border border-gray-200 shadow-xl rounded-xl'>
              <span className='flex gap-1'>
                <span className='font-semibold'>Đánh giá:</span>
                  <span className='flex items-center gap-1'> {renderStar(star)?.map((el, index) => 
                    (
                      <span key={index}>{el}</span>
                    ))}
                  </span> 
              </span>
              <span className=''>
                <span span className='font-semibold'>Bình luận:</span>
                <span className='items-center gap-2'> {comment} </span>
              </span>
            </div>
        </div>
    </div>
  )
}

export default memo(Comment)