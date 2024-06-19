import React, {memo, useState} from 'react'
import {formatMoney} from '../../ultils/helpers'
import labelnew from '../../assets/new.png'
import labeltrending from '../../assets/trending.png'
import {renderStar} from '../../ultils/helpers'
import {SelectOption} from '../'
import icons from '../../ultils/icons'
import { createSearchParams, Link } from 'react-router-dom'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'
import { DetailProduct } from '../../pages/public'
import { apiUpdateCart } from '../../apis'
import { toast } from 'react-toastify'
import { getCurrent } from '../../store/user/asyncActions'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import path from '../../ultils/path'

const { FaEye, FaCartPlus, FaRegHeart, FaHeart, BsCartCheck, BsCartCheckFill } = icons

const Product = ({productData, isNew, normal, navigate, dispatch, location}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  const { current } = useSelector(state => state.user)
  const handleOptions = async (e, flag) => {
    e.stopPropagation()
    if(flag === 'CART') {
        if(!current) return Swal.fire({
            title: 'Thông báo',
            text: 'Bạn chưa đăng nhập!',
            icon: 'info',
            cancelButtonText:'Không phải bây giờ',
            showCancelButton: true,
            confirmButtonText: 'Đăng nhập',
          }).then(async(rs) => {
            if (rs.isConfirmed) navigate({
                pathname: `/${path.LOGIN}`,
                search: createSearchParams({redirect: location.pathname}).toString()
            })
          })
          const response = await apiUpdateCart({
            pid: productData?._id,
            color: productData?.color ,
            quantity: 1, 
            price: productData?.price,
            thumbnail: productData?.thumb,
            title: productData?.title,

          })
          if (response.success) {
            toast.success(response.mes)
            dispatch(getCurrent())
          }
          else toast.error(response.mes)
    }
    if(flag === 'WISHLIST') console.log('WISHLIST')
    if(flag === 'QUICK_VIEW') {
      dispatch(showModal({isShowModal: true, modalChildren: <DetailProduct data={{pid: productData?._id, category: productData?.category}} isQuickView />})) 
    }

  }
  return (
    // render sản phẩm best seller hoặc sản phẩm mới
    <div className='w-full text-base px-[10px] py-[8px]'>
      <div
        className='w-full shadow-md rounded-md p-[15px] flex flex-col items-center'
        onClick={ e => (`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
        onMouseEnter={e => {
          e.stopPropagation()
          setIsShowOption(true)
        }}
        onMouseLeave={e => {
          e.stopPropagation()
          setIsShowOption(false)
        }}
      >

        <div className='w-full relative'>
          {isShowOption && <div className='absolute bottom-0 left-0 right-0 flex justify-center gap-4 animate-slide-top'>
            <span title='Yêu thích' onClick={(e) => handleOptions(e, 'WISHLIST')}> <SelectOption icon= {<FaHeart size={20} />} /> </span>
            {current?.cart?.some(el => el.product === productData._id.toString()) 
              ? <span title='Đã thêm vào giỏ hàng'> <SelectOption icon= {<BsCartCheckFill size={20} color='green'/>} /> </span> 
              : <span title='Thêm vào giỏ hàng' onClick={(e) => handleOptions(e, 'CART')}> <SelectOption icon= {<FaCartPlus size={20}/>} /> </span>}
            <span title='Xem nhanh' onClick={(e) => handleOptions(e, 'QUICK_VIEW')}> <SelectOption icon = {<FaEye size={20}/>} /> </span>
          </div>}
          <img src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} 
              alt="" 
              className='w-[274px] h-[274px] object-cover'
            />
            {!normal && <img src={isNew ? labelnew : labeltrending} alt="" className= {`absolute object-contain ${isNew ? 'top-[-48px] left-[-26px] w-[94px] h-[100px]' : 'top-[-48px] left-[-26px] w-[94px] h-[100px]'}`}/>}

        </div>
        {/* sao đáng giá, giá tiền */}
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
          <span className='flex h-4'> {renderStar(productData?.totalRatings)?.map((el, index) => (
                  <span key={index}> {el} </span>
                ))} </span>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
          
        </div>
      </div>
    </div>

  )
}

export default withBaseComponent(memo(Product))