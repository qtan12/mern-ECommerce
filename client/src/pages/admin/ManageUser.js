import React, { useEffect, useState, useCallback } from 'react'
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from '../../apis/user'
import { roles, blockStatus } from '../../ultils/Navigation'
import moment from 'moment'
import { InputField, InputForm, Select, Button } from '../../components'
import useDebounce from '../../hooks/useDebounce'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const ManageUser = () => {
  const {handleSubmit, register, formState: {errors}, reset} = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    mobile: false,
    status: '',
  })
  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    q: ""
  })
  const [ update, setUpdate] = useState(false)
  const [editElm, setEditElm] = useState(null)
  const fetchUser = async (params) => {
    const response = await apiGetUsers (params)
    if (response.success) setUsers(response)
  }
  const render = useCallback (() => {
    setUpdate(!update)
  }, [update])
  const queriesDebounce = useDebounce(queries.q, 800)

  useEffect(() => {
    const params = {}
    if (queriesDebounce) params.q = queriesDebounce
    fetchUser(params)
  }, [queriesDebounce, update])
  
  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, editElm._id)
    if (response.success) {
      setEditElm(null)
      render()
      toast.success(response.mes)
    }else toast.error(response.mes)
  }
  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: 'Bạn chắc chứ',
      text: 'Bạn muốn xóa người dùng này',
      showCancelButton: true
    }).then(async(rs) => {
      if(rs.isConfirmed){
        const response = await apiDeleteUser(uid)
        if (response.success) {
          render()
          toast.success(response.mes)
        }else toast.error(response.mes)
      }
    })
  }  
  useEffect(() => {
    if(editElm) reset({
      role: editElm.role,
      status: editElm.isBlocked
    })
  },[editElm])
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-6 shadow-md'>
        <span>Quản lý khách hàng</span>
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4 text-gray-700 '>
          <InputField
            nameKey={'q'}
            value={queries.q}
            setValue={setQueries}
            style='w500'
            placeholder='Tìm kiếm người dùng'
            isHideLabel
          />
        </div>
        {/* form sửa */}
        <form onSubmit={handleSubmit(handleUpdate)} >
          {editElm && <Button type='submit'>Câp nhật</Button>}
          <table className='table-auto text-left w-full'>
            {/*  */}
            <thead className='font-bold bg-[#0A0E34] text-[13px] '>
              <tr>
                <th className='p-6 '>#</th>
                <th className='p-6 '>Email</th>
                <th className='p-6 '>Họ</th>
                <th className='p-6 '>Tên</th>
                <th className='p-6 '>Phân quyền</th>
                <th className='p-6 '>Sđt</th>
                <th className='p-6 '>Trạng thái</th>
                <th className='p-6 '>Ngày tạo</th>
                <th className='p-6 '>Lựa chọn</th>
              </tr>
            </thead>
            {/*  */}
            <tbody>
              {users?.users?.map((el, idx) => (
                <tr key={el._id} className='border'>
                  <td className='px-4'>{idx+1}</td>
                  <td className='px-2'>{editElm?._id === el._id ? <InputForm 
                    register={register} 
                    fullWidth 
                    errors={errors} 
                    defaultValue={editElm?.email} 
                    id={'email'} 
                    validate={{
                      require: 'Bắt buộc', 
                      pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Địa chỉ email không hợp lệ"}}} /> : <span>{el.email}</span>}
                  </td>
                  <td className='px-2 py-2'>{editElm?._id === el._id ? <InputForm 
                    register={register} 
                    fullWidth 
                    errors={errors} 
                    defaultValue={editElm?.firstname} 
                    id={'firstname'} 
                    validate={{require: 'Bắt buộc'}}/> : <span>{el.firstname}</span>}
                  </td>
                  <td className='px-2 py-2'> {editElm?._id === el._id ? <InputForm 
                    register={register} 
                    fullWidth 
                    errors={errors} 
                    defaultValue={editElm?.lastname} 
                    id={'lastname'} 
                    validate={{require: 'Bắt buộc'}}/> : <span>{el.lastname}</span>}
                  </td>
                  <td className='px-4 py-2'> 
                    {editElm?._id === el._id ? 
                      <Select
                        register={register} 
                        fullWidth 
                        errors={errors} 
                        defaultValue={el.role}
                        id={'role'} 
                        validate={{require: 'Bắt buộc'}}
                        options={roles}
                      />
                       : <span>{roles.find(role => +role.code === +el.role)?.value}</span>}
                  </td>
                  <td className='px-2 py-2'>{editElm?._id === el._id ? <InputForm 
                    register={register} 
                    fullWidth 
                    errors={errors} 
                    defaultValue={editElm?.mobile} 
                    id={'mobile'} 
                    validate={{
                      require: 'Bắt buộc',
                      pattern: {
                                value: /^[62|0]+\d{9}/gi,
                                message: "Số điện thoại không hợp lệ"
                              }
                    }}
                    /> : <span>{el.mobile}</span>}
                  </td>
                  <td className='px-4 py-2'>
                    {editElm?._id === el._id ? 
                      <Select
                        register={register} 
                        fullWidth 
                        errors={errors} 
                        defaultValue={el.isBlocked}
                        id={'status'} 
                        validate={{require: 'Bắt buộc'}}
                        options={blockStatus}
                      /> : <span>{el.isBlocked ? 'Khóa' : 'Hoạt đọng'}</span>}
                    </td>
                  <td className='px-4 py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                  <td className='px-4 py-2'>
                    {editElm?._id === el._id ? <span onClick={() => setEditElm(null)} className='px-2 hover:underline cursor-pointer text-gray-700'>Quay lại</span> : <span onClick={() => setEditElm(el)} className='px-2 hover:underline cursor-pointer text-gray-700'>Sửa</span> }
                    <span onClick={() => handleDeleteUser(el._id)} className='px-2 hover:underline cursor-pointer text-gray-700'>Xóa</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}

export default ManageUser
