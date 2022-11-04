import { createSlice } from "@reduxjs/toolkit";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BASE_URL_API, LOCAL_STORAGE_AUTH_KEY } from "../../utils/constants";
import { sendAPIRequest, sendToast } from "../../utils/helpers";

const initialState = {
  user: JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, { payload }) => {
      if (payload.success) {
        state.user = payload.data;

        localStorage.setItem(
          LOCAL_STORAGE_AUTH_KEY,
          JSON.stringify(payload.data)
        );

        sendToast(payload.message, <AiOutlineCheck className="text-[green]" />);
      } else {
        state.user = null;

        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);

        sendToast(payload.message, <AiOutlineClose className="text-[red]" />);
      }
    },

    logoutReducer: (state) => {
      state.user = null;

      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);

      sendToast(
        "Đăng xuất thành công!",
        <AiOutlineCheck className="text-[green]" />
      );
    },
  },
});

export const loginReducerAsync = (formState) => async (dispatch) => {
  try {
    const res = await sendAPIRequest(
      `${BASE_URL_API}/auth/login`,
      "POST",
      formState
    );

    dispatch(loginReducer(res));
  } catch (error) {
    console.log(error);
  }
};

export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
