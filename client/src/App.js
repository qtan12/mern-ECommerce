// định nghĩa đường link trang web
import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import { Login, Trangchu, Public, FAQ ,DetailProduct, Blogs, Services, FinalRegister, ResetPassword, DetailCart} from './pages/public'
import path from './ultils/path';
import { layDanhmuc } from './store/app/asyncActions'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart, Modal } from './components';
import Products from './pages/public/Products';
import { AdminLayout, CreateProducts, Dashboard, ManageOrder, ManageProducts, ManageUser } from './pages/admin'
import { MemberLayout, Personal, MyCart, Wishlist, History, Checkout } from './pages/member'
import { showCart } from './store/app/appSlice';

function App() {
  const dispatch = useDispatch()
  const { isShowModal, modalChildren, isShowCart} = useSelector(state => state.app)

  useEffect(() =>{
    dispatch(layDanhmuc())
  }, [dispatch])
  
  return (
    <div className="font-main h-screen relative">
      {isShowCart && <div onClick={() => dispatch(showCart())} className='flex justify-center absolute inset-0 z-50 backdrop-brightness-50'>
        <Cart/>
        </div>}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      {/* Định nghĩa đường link */}
      <Routes>
                                      {/* component  */}
          <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.TRANGCHU} element={<Trangchu />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.SERVICES} lement={<Services />} />
          <Route path={path.PRODUCTS__CATEGORY } element={<Products />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />
           {/* path chưa đc định quay về trang chủ */}
          <Route path={path.ALL} element={<Trangchu />} />
        </Route>
        {/* Admin */}
        <Route path={path.ADMIN} element={<AdminLayout/>} >
          <Route path={path.CREATE_PRODUCTS} element={<CreateProducts/>}/>
          <Route path={path.DASHBOARD} element={<Dashboard/>}/>
          <Route path={path.MANAGE_ORDER} element={<ManageOrder/>}/>
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts/>}/>
          <Route path={path.MANAGE_USER} element={<ManageUser/>}/>
        </Route>
        {/* Nguoi dung */}
        <Route path={path.MEMBER} element={<MemberLayout/>}>
          <Route path={path.PERSONAL} element={<Personal/>}/>
          <Route path={path.MY_CART} element={<MyCart id='cart'/>}/>
          <Route path={path.WISHLIST} element={<Wishlist/>}/>
          <Route path={path.HISTORY} element={<History/>}/>
        </Route>

        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
        
       
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false} //thanh lướt
        newestOnTop={false} // nhìu thông báo, thông báo mới nhất ở đầu tiên
        closeOnClick 
        rtl={false}
        pauseOnFocusLoss // focus vào ngừng thời gian đếm 
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
