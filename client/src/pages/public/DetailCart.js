import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, OrderItem } from '../../components'
import withBaseComponent from '../../hocs/withBaseComponent'
import { formatMoney } from '../../ultils/helpers'
import path from '../../ultils/path'

const DetailCart = ({ location }) => {
  const { currentCart } = useSelector(state => state.user)
 
  return (
    <div className='w-full bg-gray-200'>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>Giỏ hàng của bạn</h3>   
          <Breadcrumb category={location?.pathname?.replace('/', '')?.split('+')?.join(' ')}/>  
        </div>
      </div>
      <div className='flex flex-col bg-white w-main mx-auto my-8 shadow-md rounded-md'>
        <div className="w-main mx-auto rounded-md text-white font-bold grid grid-cols-10 py-4 border-b h-14 bg-gradient-to-r from-sky-500 to-blue-500 ">
          <span className='w-full col-span-4 pl-6 '>Sản phẩm</span>
          <span className='w-full col-span-2 text-center'>Số lượng</span>
          <span className='w-full col-span-1 text-center'>Thực hiện</span>
          <span className='w-full col-span-3 text-end pr-6'>Thành tiền</span>
        </div>
        {currentCart?.map(el => (
          <OrderItem key={el._id} 
            pid={el.product?._id}
            title={el.title}
            price={el.price}
            color={el.color}
            thumbnail={el.thumbnail}
            defaultQuantity={el.quantity}
          />
        ))}    
        <div className='w-main mx-auto pr-6 mt-6 flex flex-col justify-center items-end gap-3'>
          <span >
            <span className='italic pr-6'>Tạm thanh toán </span>
            <span className='text-xl font-semibold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0))}đ`}</span>
          </span>
          <span className='italic'>Vận chuyển, giảm giá được tính khi thanh toán.</span>
          <Link to={`/${path.CHECKOUT}`}
            target='_blank'
            className='px-4 py-2 rounded-md text-white bg-emerald-700 text-semibold my-2 '
          >Tiến hành thanh toán</Link>
        </div>    
      </div>
      
    </div>
  )
}

export default withBaseComponent(DetailCart)
