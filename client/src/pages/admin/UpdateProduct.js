import React, {memo, useState, useEffect, useCallback} from 'react'
import { InputForm, MarkdownEditor, Select, Button, Loading } from '../../components'
import { useForm } from 'react-hook-form' 
import { getbase64 } from '../../ultils/helpers'
import { toast } from 'react-toastify'
import { apiUpdateProduct } from '../../apis'
import { useSelector, useDispatch } from 'react-redux'
import { showModal } from '../../store/app/appSlice'

const UpdateProduct = ({editProduct, setEditProduct, render}) => {
  const {danhmuc} = useSelector(state => state.app)
  const dispatch = useDispatch()
  const {register, handleSubmit, formState:{errors}, reset, watch} = useForm()
  const [payload, setPayload] = useState({
    description: ''
})
const [preview, setPreview] = useState({
  thumb: null,
  images: []
})
useEffect(() => {
  reset({
    title: editProduct?.title || '',
    price: editProduct?.price || '',
    quantity: editProduct?.quantity || '',
    color: editProduct?.color || '',
    category: editProduct?.category || '',
    brand: editProduct?.brand?.toLowerCase() || '',
  })
  setPayload({description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(',' ) : editProduct?.description})
  setPreview({
    thumb: editProduct?.thumb || '',
    images: editProduct?.images || []
  })
}, [editProduct])
// console.log(editProduct)
const [invalidField, setInvalidField] = useState([])
const changeValue = useCallback((e) => {
  setPayload(e)
}, [payload])

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

const handleUpdateProduct = async (data) => {
  if (data.category) data.category = danhmuc?.find(el => el.title === data.category)?.title
  const finalPayload = {...data, ...payload}
  finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]
  const formData = new FormData()
  for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
  for (var pair of formData.entries()) {
    console.log(pair[0] + ',' + pair[1])
  }
  finalPayload.images = data?.images?.length === 0 ? preview.images : data.images
  for (let image of finalPayload.images) formData.append('images', image)
  dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
  const response = await apiUpdateProduct(formData, editProduct._id)
  dispatch(showModal({isShowModal: false, modalChildren: null}))

  if (response.success) {
    toast.success(response.mes)
    render()
    setEditProduct(null)
  }else toast.error(response.mes)
}
  
  return (
    <div className='w-full flex flex-col gap-4 relative' >
      <div className='h-[70px] w-full'></div>
      <div className='right-0 top-0 left-[330px] fixed shadow-md flex justify-between items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
          <h1 className='h-[75px] text-3xl font-bold px-6 flex justify-between items-center'>Sửa sản phẩm</h1>
          <span onClick={() => setEditProduct(null)} className='text-blue-700 text-[18px] pr-6 hover:underline cursor-pointer'>Đóng</span>
      </div>
      <div className='p-4 '>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label='Tên sản phẩm'
            register={register}
            errors={errors}
            id='title'
            validate={{
              required:'*Bắt buộc'
            }}
            style='flex-1'
            fullWidth
            placeholder='Tên sản phẩm mới'
          />
          <div className='w-full flex gap-4 my-6'>
          <InputForm
            label='Giá sản phẩm'
            register={register}
            errors={errors}
            id='price'
            validate={{
              required:'*Bắt buộc'
            }}
            style='flex-auto'
            placeholder='Giá sản phẩm mới'
            type='number'
          />
          <InputForm
            label='Số lượng sản phẩm'
            register={register}
            errors={errors}
            id='quantity'
            validate={{
              required:'*Bắt buộc'
            }}
            style='flex-auto'
            placeholder='Số lượng sản phẩm mới'
            type='number'
          />
          <InputForm
            label='Màu sắc'
            register={register}
            errors={errors}
            id='color'
            validate={{
              required:'*Bắt buộc'
            }}
            style='flex-auto'
            placeholder='Màu sản phẩm mới'
          />
          </div>
          <div className='w-full my-6 flex gap-4'>
            <Select
              label='Danh Mục'
              options={danhmuc?.map(el => ({code: el.title, value: el.title}))}
              register={register}
              id='category'
              validate={{required:'*Bắt buộc'}}
              style = 'flex-auto'
              errors={errors}
              fullWidth
            />
            <Select
              label='Nhãn hiệu'
              options={danhmuc?.find(el => el.title === watch('category'))?.brand?.map(el => ({ code: el.toLowerCase(), value: el }))}
              register={register}
              id='brand'
              validate={{required:'*Bắt buộc'}}
              style = 'flex-auto '
              errors={errors}
              fullWidth
            />
          </div>
          <MarkdownEditor
            label='Mô tả sản phẩm'
            name='description'
            changeValue={changeValue}
            invalidField={invalidField}
            setInvalidField={setInvalidField}
            value={payload.description}
          />
          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor='thumb'>Upload ảnh Thumb</label>
            <input 
              type="file" 
              id="thumb"
              {...register('thumb')}
            />
            {errors['thumb'] && <small className='text-xs text-red-700' >{errors['thumb']?.message}</small>}
          </div>
          {preview?.thumb && <div className='my-4'>
            <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain'/>
          </div>}
          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor='productImages'>Upload ảnh slide</label>
            <input 
              type="file" 
              id="productImages" 
              multiple
              {...register('images')}
            />
          </div>
          {errors['images'] && <small className='text-xs text-red-700' >{errors['images']?.message}</small>}
          {preview?.images.length > 0 && <div className='my-4 w-full gap-4 flex flex-wrap'>
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
          <Button type='sumbit'>Sửa sản phẩm</Button>
          </div>
        </form> 
      </div>
    </div>
  )
}

export default memo(UpdateProduct)