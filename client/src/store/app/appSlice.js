import { createSlice } from "@reduxjs/toolkit"
import * as actions from './asyncActions'

export const appSlice = createSlice({
    name: ' app',
    initialState:{
        danhmuc: null,
        isLoading: false,
        isShowModal: false,
        modalChildren: null,
        isShowCart: false,
    },
    reducers: {
      showModal: (state, action) => {
        state.isShowModal = action.payload.isShowModal
        state.modalChildren = action.payload.modalChildren
      },
      showCart: (state) => {
        state.isShowCart = state.isShowCart === false ? true : false      
      }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.layDanhmuc.pending,(state) => {
          state.isLoading = true
        })
        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(actions.layDanhmuc.fulfilled, (state, action) => {
          // Tắt trạng thái loading, lưu thông tin vào store
          state.isLoading = false;
          state.danhmuc = action.payload;
        });
    
        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(actions.layDanhmuc.rejected, (state, action) => {
          // Tắt trạng thái loading, lưu thông báo lỗi vào store
          state.isLoading = false;
          state.errorMessage = action.payload.message;
        });
      },
})
export const {showModal, showCart } = appSlice.actions

export default appSlice.reducer