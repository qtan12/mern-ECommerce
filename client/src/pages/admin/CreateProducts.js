import React, { useCallback, useEffect, useState } from 'react'
import { InputForm, Select, Button, MarkdownEditor, Loading } from '../../components'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { getbase64 } from '../../ultils/helpers'
import { toast } from 'react-toastify'
import { apiCreateProduct } from '../../apis/product'
import { showModal } from '../../store/app/appSlice'


const CreateProducts = () => {
  const {danhmuc} = useSelector(state => state.app)
  const dispatch = useDispatch()
  const {register, formState: {errors}, reset, handleSubmit, watch} = useForm()
  
  const [payload, setPayload] = useState({
    description: ''
  })
  const [preview, setPreview] = useState({
    thumb: null,
    images: []
  })
  const [invalidField, setInvalidField] = useState([])
  const changeValue = useCallback((e) => {
    setPayload(e)
  }, [payload])
  const [hoverElm, setHoverElm] = useState(null)
  
  // Preview Thumb
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getbase64(file)
    setPreview(prev => ({...prev, thumb: base64Thumb}))
  }
  // Preview Images
  const handlePreviewImages = async (files) => {
    const imagesPreview =[]
    for (let file of files) {
      if (file.type !== 'image/png' &&  file.type !== 'image/jpeg'){
        toast.warning('File không thể hỗ trợ')
        return
      }
      const base64 = await getbase64(file)
      imagesPreview.push({name: file.name, path: base64})
    }
    setPreview(prev => ({...prev, images: imagesPreview}))
  }
  //Preview thumb
  useEffect(() => {
    handlePreviewThumb(watch('thumb')[0])
  }, [watch('thumb')])
  //Preview Images
  useEffect(() => {
    handlePreviewImages(watch('images'))
  }, [watch('images')])
    
  //
  const handleCreateProduct = async (data) => {
    if (data.category) data.category = danhmuc?.find(el => el._id === data.category)?.title
    const finalPayload = {...data, ...payload}
    const formData = new FormData()
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
    for (var pair of formData.entries()) {
      console.log(pair[0] + ',' + pair[1])
    }
    if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
    if (finalPayload.images) {
      for (let image of finalPayload.images) formData.append('images', image)
    }
    dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
    const response = await apiCreateProduct(formData)
    if (response.success) {
      toast.success(response.mes)
      reset()
      setPayload({
        thumb: '',
        image: []
      })
    }else toast.error(response.mes)
    dispatch(showModal({isShowModal: false, modalChildren: null}))
  }
  
  return (
    <div>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-6 shadow-lg rounded-lg'>
        <span>Tạo sản phẩm mới</span>
      </h1>
      <div className='p-4 '>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
              options={danhmuc?.map(el => ({code: el._id, value: el.title}))}
              register={register}
              id='category'
              validate={{required:'*Bắt buộc'}}
              style = 'flex-auto'
              errors={errors}
              fullWidth
            />
            <Select
              label='Nhãn hiệu'
              options={danhmuc?.find(el => el._id === watch('category'))?.brand.map(el => ({code: el, value: el}))}
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
          />
          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor='thumb'>Upload ảnh Thumb</label>
            <input 
              type="file" 
              id="thumb"
              {...register('thumb', {required: '*Bắt buộc'})}
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
              {...register('images', {required: '*Bắt buộc'})}
            />
          </div>
          {errors['images'] && <small className='text-xs text-red-700' >{errors['images']?.message}</small>}
          {preview?.images.length > 0 && <div className='my-4 w-full gap-4 flex flex-wrap'>
            {preview.images?.map((el, idx) => (
              <div 
                className='w-fit relative'
                key={idx} 
              >
                <img src={el.path} alt="productImg" className='w-[200px] h-[200px] object-contain'/>
              </div>
            ))}
          </div>}
          <div className='my-6'>
            <Button type='sumbit'>Tạo sản phẩm</Button>
          </div>
        </form> 
      </div>
    </div>
  )
}

export default CreateProducts
