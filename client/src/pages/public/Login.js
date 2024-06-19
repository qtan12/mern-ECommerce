import React, { useState, useCallback, useEffect} from 'react'
import { Outlet, useSearchParams } from 'react-router-dom' // component con của Public
import { Hearder, Navigation, InputField, Button, Footer, Loading } from '../../components' // dùng chung không đổi
import { showModal } from '../../store/app/appSlice'
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from '../../apis/user'
import Swal from 'sweetalert2'
import { useNavigate, Link} from 'react-router-dom'
import path from '../../ultils/path'
import { login } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// import { validate } from '../../ultils/helpers'


const Login = () => {
  const [payload, setPayload] = useState({
    firstname:'',
    lastname:'',
    mobile: '',
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false)
  // const [invalidField, setInvalidField ] = useState([])
  const [isRegister, setIsRegister ] = useState(false)
  const [isForgotPassword, setIsFogotPassword] = useState(false)
  const [searchParams] = useSearchParams()

  const resetPayload = () => {
    setPayload({
      firstname:'',
      lastname:'',
      mobile: '',
      email: '',
      password: '',
    })
  }
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  //thông báo trường hợp quên mật khẩu
  const handleForgotPassword = async() =>{
    const response = await apiForgotPassword({email})
    if (response.success){
      toast.success(response.mes)
    }else {
      toast.info(response.mes, {theme: 'colored'})
    }
  }
  useEffect(() => {
    resetPayload()
  },[isRegister])
  // console.log(validate(payload))
  // submit
  const handleSubmit = useCallback(async() =>{
    const {firstname, lastname, mobile, ...data} = payload
    // Đăng ký
    // const invalid = isRegister ? validate(payload, setInvalidField) : validate(data, setInvalidField)
    // if (invalid === 0){
      // click đăng ký
      if (isRegister) {
        dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
        const response = await apiRegister(payload) 
        dispatch(showModal({isShowModal: false, modalChildren: null}))
        if (response.success ){
          setIsVerifiedEmail(true)
        } else Swal.fire('Oops!', response.mes, 'bạn cần nhập đủ thông tin.')    
      // Đăng nhập
      } else {
        const rs = await apiLogin(data)
        if (rs.success) {
          dispatch(login({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
          searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.TRANGCHU}`)
        } else Swal.fire('Oops!', 'Nhập chưa đúng.')
      }
    // }
  },[payload, isRegister, dispatch, navigate])
// Thông báo sau khi người dùng nhập mã code
  const finalRegister = async () => {
    const response = await apiFinalRegister(token)
    if(response.success) {
      Swal.fire('Congratulation', response.mes, 'success').then (() => {
        setIsRegister(false)
        resetPayload()
      })
    }else Swal.fire('Oops!', response.mes, 'error')
    setIsVerifiedEmail(false)
    setToken(' ')
  }

  return (
    <div className='w-full flex flex-col items-center'>
        <Hearder/>
        <Navigation/>
      <div className='w-main'>
        <Outlet />
      </div>
      {/* form mã code */}
      <div className='w-screen h-screen relative'>
       {isVerifiedEmail &&  <div className='absolute top-0 left-0 right-0 bottom-0 backdrop-brightness-50 z-50 flex flex-col justify-center items-center '>
          <div className='bg-white w-[500px] rounded-md p-8'>
            <h4 className=''>Hãy check mail của bạn để lấy mã code.<br/> Nhập mã code vào đây để hoàn thành đăng ký.</h4>
            <input type="text"
              value={token}
              onChange={e => setToken(e.target.value)}
              className = "p-2 border rounded-md outline-none"
             />
             <button 
              type='button'
              className='px-4 py-2 bg-blue-500 font-semibold text-white rounded-md ml-4'
              onClick={finalRegister}
             >
              Gửi
             </button>
          </div>
        </div>}
        {/* quên mật khẩukhẩu */}
        {isForgotPassword && <div className=' absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white  z-50 flex py-8 flex-col items-center'> 
          <div className='flex flex-col gap-4'>
            <label htmlFor='email'> Nhập email quên mật khẩu:</label>
            <input 
              type="text"
              id="email"
              className='w-[800px] pb-2 border-b outline-none placeholder:tetx-sm' 
              placeholder='email@gmail.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className='flex items-center justify-end w-full gap-4'>
              <Button
                handleOnClick={handleForgotPassword}
              >
                Gửi
              </Button>
              <Button
                handleOnClick={() => setIsFogotPassword(false)}
                style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2 '
              >
                Quay lại
              </Button>
            </div>
          </div>
        </div>}
        <img
          src='https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
          alt=''
          className='w-full h-full object-cover'
        />
        {/*  */}
        <div className='absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex'>
          <div className='p-8 bg-white rounded-md min-w-[500px] items-center flex flex-col '>
            {                                                        /* xét đăng ký. Nếu là đăng ký thì là true. còn ko thì là false đăng nhập */}
            <h1 className='text-[28px] font-semibold text-emerald-700'>{isRegister? 'Đăng ký' : 'Đăng nhập'}</h1>
            {/* Nếu đúng thì hiện form đăng ký */}
            { isRegister && <div className='flex items-center gap-2'>
              <InputField
                fullWidth
                value={payload.firstname}
                setValue={setPayload}
                nameKey='firstname'
                  // invalidField={invalidField}
                  // setInvalidField={setInvalidField}
              /> 
              <InputField
                fullWidth
                value={payload.lastname}
                setValue={setPayload}
                nameKey='lastname'
                // invalidField={invalidField}
                // setInvalidField={setInvalidField}
              />
              </div> }
              { isRegister && <InputField
                fullWidth
                value={payload.mobile}
                setValue={setPayload}
                nameKey='mobile'
                // invalidField={invalidField}
                // setInvalidField={setInvalidField}
              />}
              <InputField
                fullWidth
                value={payload.email}
                setValue={setPayload}
                nameKey='email'
                // invalidField={invalidField}
                // setInvalidField={setInvalidField}
              />
              <InputField
                fullWidth
                value={payload.password}
                setValue={setPayload}
                nameKey='password'
                type='password'
                // invalidField={invalidField}
                // setInvalidField={setInvalidField}
              />
              <Button
                handleOnClick={handleSubmit}
                fw
              >
                {isRegister ? 'Đăng ký' : 'Tiếp Tục'}
              </Button>
      
              <div className='flex items-center justify-between my-2 w-full text-sm'>
                {/* nếu không có */}
                { !isRegister && <span 
                  onClick={() => setIsFogotPassword(true)} 
                  className='text-blue-500 hover:underline cursor-pointer'
                  >Quên mật khẩu</span>}
                { !isRegister && <span 
                  className='text-blue-500 hover:underline cursor-pointer'
                  onClick={() => setIsRegister(true)} 
                  >Tạo tài khoản</span> }

                {/* Nếu có */}
                { isRegister && <span 
                  className='text-blue-500 hover:underline cursor-pointer w-full text-center'
                  onClick={() => setIsRegister(false)} 
                  >Quay lại</span> }
              </div>
              {/* <Link className='text-blue-500 hover:underline cursor-pointer w-full text-center text-[14px]' to={`/${path.TRANGCHU}`}>Trang chủ</Link> */}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Login