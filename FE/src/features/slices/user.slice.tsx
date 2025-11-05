// features/slices/user.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { UserLogin } from "../../untils/types/TypeUserLogin";

const initialState: UserLogin = {
  id: "",
  name: "",
  email: "",
  gioiTinh: "",
  namSinh: "",
  sdt: "",
  diaChi: "",
  avatar: "",
  isVerified: false,
  createdAt: "",
  updatedAt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      return { ...state, ...action.payload }; // ✅ Cập nhật đúng
    },
    resetUserState: () => initialState, // ✅ reset về trạng thái ban đầu
  },
});

export const { setUserState, resetUserState } = userSlice.actions;
export const infoUserState = (state: any) => state.user;
export default userSlice.reducer;
