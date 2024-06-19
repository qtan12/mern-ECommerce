import React, { memo, useState } from 'react'
import { productInfoTabs } from '../../ultils/Navigation'
import { Button, VoteBar, VoteOption, Comment } from '../'
import {renderStar} from '../../ultils/helpers'
import {apiRatings} from '../../apis/product'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../store/app/appSlice'
import Swal from 'sweetalert2'
import path from '../../ultils/path'
import { useNavigate } from 'react-router-dom'


const InfomationProduct = ({totalRatings, ratings, nameProduct, pid, rerender}) => {
    const [activeTab, setActiveTab] = useState(1)
    const dispatch = useDispatch()
    const {isLoggedIn, setIsLoggedIn} = useSelector(state => state.user)
    const navigate = useNavigate()
    
    const handleSubmitVoteOption = async ({comment, star}) => {
        if(!comment || !pid || !star) {
            alert('Xin hãy nhập thêm đủ thông tin!')
            return 
        }
        await apiRatings({star: star, comment, pid, updatedAt: Date.now()})
        dispatch(showModal({isShowModal: false, modalChildren: null}))
        rerender() 
    }
    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Đăng nhập để đánh giá.',
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Đăng nhập',
                title: 'Oops!',
                showCancelButton: true,
                
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
            }) 
        }else {
            dispatch(showModal(
                {
                    isShowModal: true,
                    modalChildren: <VoteOption 
                        nameProduct={nameProduct}
                        handleSubmitVoteOption={handleSubmitVoteOption}
                        
                    />
                }
            ))
        }
    }

  return (
    <div>
        <div className='flex items-center gap-2'>
            {/* infoTab */}
            {productInfoTabs.map(el => (
                <span 
                    className={`py-2 px-4 cursor-pointer shadow-lg rounded  ${activeTab === +el.id ? 'bg-white text-emerald-700' : 'bg-gray-200 text-gray-500 border'}`} 
                    key={el.id}
                    onClick={() => setActiveTab(el.id)} 
                    >{el.name}
                </span>
            ))}
        </div>
        <div className='w-full shadow-lg rounded-lg p-4 border' >
            {productInfoTabs.some(el => el.id === activeTab) && productInfoTabs.find(el => el.id === activeTab)?.content} 
        </div>
        <div className='flex flex-col pt-8'>
            <div className='p-4 shadow-lg rounded-lg'>
                <h2 className='font-semibold pb-4'>Đánh giá && nhận xét</h2>
                <div className='flex '>
                    {/* TotalRatings */}
                    <div className='flex-4 flex flex-col items-center justify-center border border-red-500'>
                        <span className='font-semibold text-3xl'>{`${totalRatings}/5`}</span>
                        <span className='flex items-center gap-1'>{renderStar(totalRatings)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}</span>
                        <span className='text-sm'>{`${ratings?.length} đánh giá và comment`}</span>
                    </div>
                    {/* VoteBar */}
                    <div className='flex-6 flex flex-col gap-2 p-4'>
                        {Array.from(Array(5).keys()).reverse().map(el => (
                            <VoteBar
                                key={el}
                                number={el+1}
                                reviewTotal={ratings?.length}
                                reviewCount={ratings?.filter(i => i.star === el + 1)?.length}
                            />
                        ))}
                    </div>
                </div>
                {/* Button đánh giá ngay! */}
                <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
                    <span>Bạn đánh giá sao về sản phẩm này?</span>
                    <Button handleOnClick={handleVoteNow}>
                        Đánh giá ngay!
                    </Button>
                </div>
                {/* Hiển thị đánh giá */}
                <div>
                    {ratings?.map(el => (
                        <Comment 
                            key={el.id}
                            star={el.star}
                            updatedAt={el.updatedAt}
                            comment={el.comment}
                            name={`${el.postedBy?.firstname} ${el.postedBy?.lastname}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(InfomationProduct)