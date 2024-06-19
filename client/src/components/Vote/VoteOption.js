import React, {memo, useRef, useEffect, useState} from 'react'
import { voteOptions } from '../../ultils/Navigation'
import { FaStar } from 'react-icons/fa'
import { Button } from '../'

const VoteOption = ({nameProduct, handleSubmitVoteOption}) => {
    const modalRef = useRef()
    const [voteStar, setVoteStar] = useState(null)
    const [comment, setComment] = useState('')
    const [star, setStar] = useState(null)
    useEffect(() => {
        modalRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
    }, [])
  return (
    <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-4 flex items-center justify-center flex-col gap-4'>
        <img 
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:100:100/q:90/plain/https://cellphones.com.vn/media/wysiwyg/cps-ant.png" 
            alt="logo" 
            className='w-[100px] h-[100px] oject-contain' />
            <h2 className='text-center text-medium text-lg'>{nameProduct}</h2>
            <textarea 
                className='outline-none text-gray-700 w-full border p-4 rounded-md placeholder:italic placeholder:text-sm focus:ring-blue-500 focus:border-blue-500' 
                placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm..."
                value={comment}
                onChange={e => setComment(e.target.value)}
            ></textarea>
            <div className='w-full flex flex-col gap-4'>
                <p className='font-semibold '>Đánh giá chung</p>
                <div className='flex items-center justify-center gap-4'>
                    {voteOptions.map(el => (
                        <div className='w-[100px] flex items-center justify-center flex-col gap-2 hover:text-red-700 cursor-pointer' 
                            keys={el.id}
                            onClick={() => {
                                setVoteStar(el.id)
                                setStar(el.id)
                            }}
                        >   
                            {(Number(voteStar) && voteStar >= el.id) ? <FaStar color='orange' /> : <FaStar color='gray'/>}
                            <span className=''>{el.text}</span>
                        </div>
                    ))}
                </div>
                <Button handleOnClick={() => handleSubmitVoteOption({comment, star})} fw>Gửi đánh giá</Button>
            </div>
    </div>
  )
}

export default memo(VoteOption)