import React, { useEffect } from 'react'
import { Button, InputForm } from '../../components'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/avtDefaul.png'
import { apiUpdateByCurrent } from '../../apis'
import { getCurrent } from '../../store/user/asyncActions'
import { toast } from 'react-toastify'
import { RiEdit2Line } from "react-icons/ri";

const Personal = () => {
  const {handleSubmit, register, formState: {errors, isDirty}, reset} = useForm()
  const { current } =  useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
      address: current?.address,
    })
  }, [current])
  const handleUpdateInfo = async(data) => {
    const formData = new FormData()
    if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
    delete data.avatar
    for (let i of Object.entries(data)) formData.append(i[0], i[1])
    const response = await apiUpdateByCurrent(formData)
    if (response.success){
      dispatch(getCurrent())
      toast.success(response.mes)
    } else toast.error(response.mes)
  }
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex gap-4 items-center text-3xl font-bold px-6 shadow-lg rounded-lg'>
        <span>Trang cá nhân</span>
        <RiEdit2Line className='text-gray-800'/>

      </h1>
      <form onSubmit={handleSubmit(handleUpdateInfo)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
        <InputForm
              label='Tên '
              register={register}
              errors={errors}
              id='firstname'
              style='flex-1'
              fullWidth
              />
          
          <InputForm
              label='Họ'
              register={register}
              errors={errors}
              id='lastname'
              style='flex-1'
              fullWidth
          />
          <InputForm
              label='Email'
              register={register}
              errors={errors}
              id='email'
              style='flex-1'
              fullWidth
              validate={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Email không hợp lệ'
                }
              }}
          />
          <InputForm
              label='Số điện thoại'
              register={register}
              errors={errors}
              id='mobile'
              style='flex-1'
              fullWidth
              validate={{
                pattern: {
                  value: /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/,
                  message: 'Số điện thoại không hợp lệ'
                }
              }}
          />
          <InputForm
              label='Địa chỉ'
              register={register}
              errors={errors}
              id='address'
              style='flex-1'
              fullWidth
              validate={{
                require: '*Bắt buộc'
              }}
          />
          <div className='flex flex-col justify-center gap-2'>
            <span >Avatar:</span>
            <label htmlFor='file'>
              <img src={current?.avatar || avatar} alt="avatar" className='w-20 h-20 object-cover rounded-full cursor-pointer ml-8'/>
            </label>
            <input  type="file" id="file" {...register('avatar')} hidden/>
          </div>
          {isDirty && <div className='w-full flex justify-end'>
            <Button type='submit'>Cập nhật thông tin</Button>
          </div>}
      </form>
    </div>
    
  )
}

export default Personal
