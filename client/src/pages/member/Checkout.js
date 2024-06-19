import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import payment from '../../assets/payment.svg'
import { Congratulation, InputForm, Paypal } from '../../components'
import withBaseComponent from '../../hocs/withBaseComponent'
import { getCurrent } from '../../store/user/asyncActions'
import { formatMoney } from '../../ultils/helpers'

const Checkout = ({dispatch}) => {
    const {currentCart, current} = useSelector(state => state.user)
    const {register, formState: {errors}, watch, setValue} = useForm()
    const [isSuccess, setIsSuccess] = useState(false)
    const address = watch('address')

    useEffect(() => {
        setValue('address', current?.address)
    }, [current?.address])
    useEffect(() => {
        if (isSuccess) dispatch(getCurrent())
    }, [isSuccess])
    return (
    <div className='w-full p-8 grid grid-cols-10 gap-6 h-full max-h-screen overflow-y-auto'>
        {isSuccess && <Congratulation/>}
        <div className='w-full flex items-center col-span-3'>
            <img src={payment} alt='payment' className='h-[50%] object-contain'/>
        </div>
        <div className='w-full flex flex-col col-span-7 gap-6'>
            <h2 className='text-2xl font-bold text-center'>Thanh toán</h2>
            <div className='flex w-full gap-6 justify-between'>
                <div className='w-full flex flex-col gap-1 flex-1'>
                    <span className='font-semibold'>Thông tin mua hàng</span>
                    <InputForm 
                        register={register}
                        errors={errors}
                        id='address'
                        validate={{
                        required:'*Bắt buộc'
                        }}
                        placeholder='Địa chỉ nhận hàng'
                    />
                     <div>
                        <span className=' font-semibold'>Phương thức thanh toán</span>
                        <div className='w-[50%] mx-auto'>
                          <Paypal
                            payload={{
                                products: currentCart, 
                                total: Math.round((+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) + 30000) / 23000),
                                address 
                            }}
                            setIsSuccess={setIsSuccess}
                            amount={Math.round((+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) + 30000) / 23000)}/>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className='flex-1 w-full flex flex-col gap-1'>
                    <span className='font-semibold'>Đơn hàng</span>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='border bg-gray-200'>
                                <th className='text-left p-2'>Sản phẩm</th>
                                <th className='text-center p-2'>Màu sắc</th>
                                <th className='text-center p-2'>Số lượng</th>
                                <th className='text-right p-2'>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCart?.map(el => (
                                <tr key={el._id} className='border'>
                                    <td className='text-left p-2'>{el.title}</td>
                                    <td className='text-center p-2'>{el.color}</td>
                                    <td className='text-center p-2'>{el.quantity}</td>
                                    <td className='text-right p-2'>{formatMoney(el.price) + 'đ'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className=' flex flex-col'>
                        <div className=' flex flex-col mr-2 gap-1 mt-4'>
                            <span className='flex  justify-between'>
                                <span className='italic mr-6 font-semibold'>Tổng tiền </span>
                                <span className='text-xl font-semibold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum , 0))}đ`}</span>
                            </span>
                            <span className='flex  justify-between'>
                                <span className='italic mr-6 '>Phí thanh vận chuyển</span>
                                <span className='italic'>30.000đ</span>
                            </span>
                            <span className='italic text-right'>Giá đã bao gồm khuyến mãi </span>
                            <span className='border-t mt-2 flex  justify-between'>
                                <span className='italic mr-6 font-semibold'>Tổng thanh toán </span>
                                <span className='text-2xl font-semibold'>{`${formatMoney(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) + 30000)}đ`}</span>
                            </span>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default withBaseComponent(Checkout)
