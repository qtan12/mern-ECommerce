import { createSlice } from "@reduxjs/toolkit"
import * as actions from './asyncActions'

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: '',
        currentCart: []

    },
    reducers: {
      login : (state, action) => {
        // console.log(action)
        state.isLoggedIn = action.payload.isLoggedIn
        state.token = action.payload.token
      },
      logout : (state) => {
        // console.log(action)
        state.isLoggedIn= false
        state.current= null
        state.token= null
        state.isLoading= false
        state.mes= ''
      },
      clearMessage: (state) => {
        state.mes = ''
      },
      updateCart: (state, action) => {
        const {pid, quantity, color} = action.payload
        const updatingCart = JSON.parse(JSON.stringify(state.currentCart))
        state.currentCart = updatingCart.map(el => {
          if (el.color === color && el.product?._id === pid) {
            return {...el, quantity}
          } else return el
        })
      }
     
    },
    extraReducers: (builder) => {
      builder.addCase(actions.getCurrent.pending,(state) => {
        state.isLoading = true
      })
      // Khi thực hiện action login thành công (Promise fulfilled)
      builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
        // Tắt trạng thái loading, lưu thông tin vào store
        state.isLoading = false;
        state.current = action.payload;
        state.isLoggedIn = true;
        state.currentCart = action.payload.cart;

      });
  
      // Khi thực hiện action login thất bại (Promise rejected)
      builder.addCase(actions.getCurrent.rejected, (state, action) => {
        // Tắt trạng thái loading, lưu thông báo lỗi vào store
        state.isLoading = false;
        state.current = null;
        // hết hạn token dis trạng thái đăng nhập
        state.isLoggedIn = false;
        state.token = null
        //
        state.mes = 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại'
      });
    },
})
export const { login, logout, clearMessage, updateCart } = userSlice.actions

export default userSlice.reducer