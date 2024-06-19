import React, {memo, Fragment, useState, useEffect} from 'react'
import logo from '../../assets/SmartTech.png'
import icons from '../../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../../ultils/path'
import { useSelector } from 'react-redux'
import { logout } from '../../store/user/userSlice'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showCart } from '../../store/app/appSlice'

const Hearder = ({dispatch}) => {
    const {FaPhoneAlt, MdEmail, FaShoppingCart, FaUser } = icons
    const { current } = useSelector(state => state.user)
    const [isShowOption, setIsShowOption] = useState(false)
    useEffect(() => {
        const handleClickoutOptions = (e) => {
            const profile = document.getElementById('profile')
            if (!profile?.contains(e.target)) setIsShowOption(false)
        }
        document.addEventListener('click', handleClickoutOptions)
        return () => {
            document.removeEventListener('click', handleClickoutOptions)
        }
    }, [])
  return (
    <div className='w-main flex justify-between h-[132px] py-[35px] border-b border-emerald-700'>
            {/* dấu `` tượng trưng cho locoalhost xong / cái tính tới */}
        <Link to={`/${path.TRANGCHU}`}>
            <img src={logo} alt="logo" className='w-[240px] object-contain'/>
        </Link>

        <div className='flex text-[13px] '>
            <div className='flex flex-col px-5 items-center border-r border-red-400'>
                <span className='flex gap-4 items-center'>
                    <FaPhoneAlt color='red'/>
                    <span className='font-semibold'>(+84) 3333 521 69</span>
                </span>
                <span>Thu2-Thu7 9:00AM - 9:00PM</span>
            </div>

            <div className='flex flex-col items-center px-5 border-r border-red-400'>
                <span className='flex gap-4 items-center'>
                    <MdEmail color='red'/>
                    <span className='font-semibold'>qtan8089@gmail.com</span>
                </span>
                <span>Hỗ trợ online 24/7</span>
            {/* Cục Profile  */}
            </div>
                {current && <Fragment>
                <div onClick={() => dispatch(showCart()) } className='cursor-pointer flex items-center justify-center gap-2 px-5 border-r border-red-400'>
                    <FaShoppingCart size={18} color='red'/>
                    <span>{`${current?.cart?.length|| 0} sản phẩm`}</span>
                </div>
                <div 
                    className='cursor-pointer flex items-center justify-center px-2 gap-2 relative'
                    onClick={() => setIsShowOption( prev => !prev)}
                    id='profile'
                >
                    <FaUser size={18} color='red' />
                    <span>profile</span>
                    {isShowOption && <div onClick={e => e.stopPropagation()} className='absolute flex flex-col top-full left-[16px] bg-red-500 min-w-[120px] py-2'>
                        <Link className='w-full p-2 hover:bg-sky-600' to={`/${path.MEMBER}/${path.PERSONAL}`}>Trang cá nhân</Link>
                        {+current.role === 2002 && <Link className='w-full p-2 hover:bg-sky-600' to={`/${path.ADMIN}/${path.DASHBOARD}`}>Admin workspace</Link>}
                        <span onClick={() => dispatch(logout())} className='p-2 w-full hover:bg-sky-600'>Đăng xuất</span>
                    </div>}
                </div>    
                </Fragment>}
            </div>
        </div>
    )
}

export default withBaseComponent(Hearder)