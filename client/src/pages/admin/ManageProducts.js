import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomizeVarriants, InputForm } from '../../components'
import { apiGetSanpham, apiDeleteProduct } from '../../apis'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import UpdateProduct from './UpdateProduct'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageProducts = () => {
  const [params] = useSearchParams()
  const {register, formState: {errors}, watch} = useForm()
  const [products, setProducts] = useState(null)
  // const [count, setCount] = useState(0)
  const [editProduct, setEditProduct] = useState(null)
  const [update, setUpdate] = useState(false)
  const [customizeVarriant, setCustomizeVarriant] = useState(null)
  const render = useCallback(() => {
    setUpdate(!update)
  })
  const fetchProducts = async(params) => {
    const response = await apiGetSanpham(params)
    if (response.success) {
      setProducts(response.count)
      setProducts(response.products)
    }
  }
  const queryDebounce = useDebounce(watch('q'), 800)

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    if (queryDebounce) searchParams.q = queryDebounce
    fetchProducts(searchParams)
  }, [params, queryDebounce, update])

  const handleDeleteProduct = ( pid ) => {
    Swal.fire({
      title: 'Bạn chắc chứ?', 
      text: 'Bạn muốn xóa sản phẩm này',
      icon: 'warning',
      showCancelButton: true,
    }).then(async(rs) => {
      if(rs.isConfirmed){
        const response = await apiDeleteProduct(pid)
        if (response.success) toast.success(response.mes)
        else toast.error(response.mes)
        render()
      }
    })
  }
  return (
    <div className='w-full flex flex-col gap-4 relative'>
      {editProduct && <div className='absolute inset-0 min-h-sceen z-50 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
        <UpdateProduct 
          editProduct={editProduct} 
          render={render}
          setEditProduct={setEditProduct}
        />
      </div>}
      {customizeVarriant && <div className='absolute inset-0 min-h-sceen z-50 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
        <CustomizeVarriants
          customizeVarriant={customizeVarriant}
          render={render}
          setCustomizeVarriant={setCustomizeVarriant}
        />
      </div>}
      <div className='h-[70px] w-full'></div>
      <div className='w-full fixed top-0 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
          <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-6 shadow-md'>Quản lý sản phẩm</h1>
      </div>
      <div className='flex justify-end py-4 text-gray-700'>
          <form className='w-[45%]'>
            <InputForm
              id='q'
              register={register}
              errors={errors}
              fullWidth
              placeholder='Tìm kiếm sản phẩm với tên, mổ tả sản phẩm...'
            />
          </form>
      </div>
      <table className='table-auto mb-6 text-left w-full  '>
        <thead className='font-bold bg-[#0A0E34] text-[13px]'>
          <tr>
            <th className='py-6 text-center '>Order</th>
            <th className='py-6 text-center '>Thumb</th>
            <th className='py-6 text-center '>Tên</th>
            <th className='py-6 text-center '>Danh mục</th>
            <th className='py-6 text-center '>Nhãn hàng</th>
            <th className='py-6 text-center '>Giá</th>
            <th className='py-6 text-center '>Số lượng</th>
            <th className='py-6 text-center '>Đã bán</th>
            <th className='py-6 text-center '>Màu sắc</th>
            <th className='py-6 text-center '>Đánh giá</th>
            <th className='py-6 text-center '>Biến thể</th>
            <th className='py-6 text-center '>Gần đây</th>
            <th className='py-6 text-center '>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, idx) => (
            <tr className='border' key={el._id}>
              <td className='py-2 text-center'>{idx+1}</td>
              <td className='py-2 text-center'>
                <img src={el.thumb} alt="thumb" className='w-12 h-12 object-cover'/>
              </td>
              <td className='py-2 text-center'>{el.title}</td>
              <td className='py-2 text-center'>{el.category}</td>
              <td className='py-2 text-center'>{el.brand}</td>
              <td className='py-2 text-center'>{el.price}</td>
              <td className='py-2 text-center'>{el.quantity}</td>
              <td className='py-2 text-center'>{el.sold}</td>
              <td className='py-2 text-center'>{el.color}</td>
              <td className='py-2 text-center'>{el.totalRatings}</td>
              <td className='py-2 text-center'>{el?.varriants?.length || 0}</td>
              <td className='py-2 text-center'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
              <td className='py-2 text-center'>
                <span onClick={() => setEditProduct(el)} className='text-blue-700 hover:text-[#0A0E34] cursor-pointer px-1 inline-block'><FiEdit size={20}/></span>
                <span onClick={() => handleDeleteProduct(el._id)} className='text-blue-700 hover:text-[#0A0E34] cursor-pointer px-1 inline-block'><RiDeleteBin6Line size={22}/></span>
                <span onClick={() => setCustomizeVarriant(el)} className='text-blue-700 hover:text-[#0A0E34] cursor-pointer px-1 inline-block'><MdOutlineDashboardCustomize size={22}/></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageProducts
