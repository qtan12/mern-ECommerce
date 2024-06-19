import React, {memo, useEffect, useState} from 'react'
import { InputForm, Button, Loading } from '../../components'
import { useForm } from 'react-hook-form' 
import { toast } from 'react-toastify'
import { getbase64 } from '../../ultils/helpers'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { apiAddVarriant } from '../../apis'
import { showModal } from '../../store/app/appSlice'

const CustomizeVarriants = ({customizeVarriant, setCustomizeVarriant, render}) => {
  const [preview, setPreview] = useState({
    thumb: '', 
    images:''
  })
  const dispatch = useDispatch()
  const {register, handleSubmit, formState:{errors}, reset, watch} = useForm()
  useEffect(() => {
    reset({
        title: customizeVarriant?.title,
        price: customizeVarriant?.price,
        color: customizeVarriant?.color,
    })
  }, [customizeVarriant])

  const handleAddVarriant = async (data) => {
    if (data.color === customizeVarriant.color) Swal.fire('Oops!', 'Màu không thể thay đổi', 'info')
    else {
      const formData = new FormData()
      for (let i of Object.entries(data)) formData.append(i[0], i[1])
      if (data.thumb?.[0]) formData.append('thumb', data.thumb[0])
      if (data.images) {
        for (let image of data.images) formData.append('images', image)
      }
      dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
      const response = await apiAddVarriant(formData, customizeVarriant._id)
      dispatch(showModal({isShowModal: false, modalChildren: null}))
      if (response.success) {
        toast.success(response.mes)
        reset()
        setPreview({ thumb: '', images: [] })
      }else toast.error(response.mes)
    }
  }
  // Preview Thumb
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getbase64(file)
    setPreview(prev => ({...prev, thumb: base64Thumb}))
  }
  // Preview Images
  const handlePreviewImages = async (files) => {
    const imagesPreview =[]
    for (let file of files) {
      if (file.type !== 'image/png' &&  file.type !== 'image/jpeg' &&  file.type !== 'image/jpg'){
        toast.warning('File không thể hỗ trợ')
        return
      }
      const base64 = await getbase64(file)
      imagesPreview.push(base64)
    }
    setPreview(prev => ({...prev, images: imagesPreview}))
  }
  //Preview thumb
  useEffect(() => {
    if (watch('thumb') instanceof FileList && watch('thumb').length > 0) 
      handlePreviewThumb(watch('thumb')[0])
  }, [watch('thumb')])
  //Preview Images
  useEffect(() => {
    if(watch('images') instanceof FileList && watch('images').length > 0)
      handlePreviewImages(watch('images'))
  }, [watch('images')])
  
    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <div className='h-[70px] w-full'></div>
            <div className='right-0 top-0 left-[330px] fixed shadow-md flex justify-between items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
                <h1 className='h-[75px] text-3xl font-bold px-6 flex justify-between items-center'>Thêm biến thể</h1>
                <span 
                    className='text-blue-600 text-[18px] pr-6 hover:underline cursor-pointer' 
                    onClick={() => setCustomizeVarriant(null)}
                >
                    Quay lại
                </span>
            </div>
            <form onSubmit={handleSubmit(handleAddVarriant)} className='p-4 flex flex-col w-full'>
                {/* <span className='text-[20px] uppercase'> Sản phẩm chính:</span>
                <div className='w-full flex gap-4 my-6'> 
                    <InputForm
                        id='title'
                        label='Tên sản phẩm chính'
                        // placeholder='Tên sản phẩm mới'
                        style='flex-auto'
                        register={register}
                        errors={errors}
                        fullWidth
                        readOnly
                        disabled={true}
                    />
                    <InputForm
                        id='price'
                        label='Giá gốc'
                        // placeholder='Giá sản phẩm'
                        type='number'
                        style='flex-auto'
                        fullWidth
                        register={register}
                        errors={errors}
                        readOnly
                        disabled={true}
                    />
                    <InputForm
                        id='color'
                        label='Màu sắc chính'
                        // placeholder='Màu sản phẩm'
                        style='flex-auto'
                        fullWidth
                        register={register}
                        errors={errors}
                        readOnly
                        disabled={true}
                    />
                </div> */}
                <span className='text-[20px] uppercase mt-[30px]'>sản phẩm Varriant:</span>
                <div className='w-full flex gap-4 my-6'>
                    <InputForm
                        id='title'
                        label='Tên sản phẩm'
                        placeholder='Tên sản phẩm varriant'
                        style='flex-auto'
                        register={register}
                        errors={errors}
                        fullWidth
                        validate={{
                          required:'*Bắt buộc'
                        }}
                    />
                    <InputForm
                        id='price'
                        label='Giá sản phẩm'
                        placeholder='Giá sản phẩm varriant'
                        type='number'
                        register={register}
                        errors={errors}
                        validate={{
                          required:'*Bắt buộc'
                        }}
                        style='flex-auto'
                    />
                    <InputForm
                        id='color'
                        label='Màu sắc'
                        placeholder='Màu sản phẩm varriant'
                        register={register}
                        errors={errors}
                        validate={{
                          required:'*Bắt buộc'
                        }}
                        style='flex-auto'
                    />
                    
                </div>
                <div className='flex flex-col gap-2 mt-8'>
                    <label htmlFor='thumb'>Upload ảnh Thumb</label>
                    <input 
                      type="file" 
                      id="thumb"
                      {...register('thumb', {required: '*Bắt buộc'})}
                    />
                    {errors['thumb'] && <small className='text-xs text-red-700' >{errors['thumb']?.message}</small>}
                 </div>
                {preview.thumb && <div className='my-4'>
                  <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain'/>
                </div>}
                <div className='flex flex-col gap-2 mt-8'>
                  <label htmlFor='productImages'>Upload ảnh slide</label>
                  <input 
                    type="file" 
                    id="productImages" 
                    multiple
                    {...register('images', {required: '*Bắt buộc'})}
                  />
                </div>
                {errors['images'] && <small className='text-xs text-red-700' >{errors['images']?.message}</small>}
                {preview.images.length > 0 && <div className='my-4 w-full gap-4 flex flex-wrap'>
                  {preview.images?.map((el, idx) => (
                    <div 
                      className='w-fit relative'
                      key={idx} 
                    >
                      <img src={el} alt="productImg" className='w-[200px] h-[200px] object-contain'/>
                    </div>
                  ))}
                </div>}
                <div className='my-6'>
                    <Button type='sumbit'>Thêm biến thể</Button>
                </div>
            </form>
        </div>
  )
}

export default memo(CustomizeVarriants)
