import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "", 
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  city: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        id = "",
        name = "",
        email = "",
        phone = "",
        address = "",
        avatar = "",
        city = "",
      } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.city = city;
    },
    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.city = "";
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
