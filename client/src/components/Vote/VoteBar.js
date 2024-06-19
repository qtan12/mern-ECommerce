import React, {memo, useRef, useEffect} from 'react'
import {FaStar} from 'react-icons/fa'

const VoteBar = ({number, reviewCount, reviewTotal}) => {

    const percentRef = useRef()
    useEffect(() => {
        const percent = Math.round(reviewCount * 100 / reviewTotal) || 0
        percentRef.current.style.cssText = `right: ${100 - percent}%`
    }, [reviewCount, reviewTotal])
  return (
    <div className='flex items-center gap-2 text-sm text-gray-500'>
        <div className='flex w-[10%] items-center justify-center gap-1 text-sm'>
            <span>{number}</span>
            <FaStar color='orange'/>
        </div>
        <div className='w-[75%]'>
            <div className='relative w-full h-[6px] bg-gray-200 rounded-sm'>
                <div ref={percentRef} className='absolute inset-0 bg-red-500 '>
                </div>

            </div>
        </div>
        <div className='w-[15%] text-xs '>{`${reviewCount || 0} đánh giá`}</div>
    </div>
  )
}

export default memo(VoteBar)