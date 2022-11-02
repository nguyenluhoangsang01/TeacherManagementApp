import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BASE_URL_API, LOCAL_STORAGE_AUTH_KEY } from "../../utils/constants";
import sendAPIRequest from "../../utils/helpers";

const initialState = {
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, { payload }) => {
      state.isLoading = true;

      if (payload.success) {
        state.user = payload.data;
        state.isLoading = false;

        localStorage.setItem(
          LOCAL_STORAGE_AUTH_KEY,
          JSON.stringify(payload.data)
        );

        toast(payload.message, {
          icon: <AiOutlineCheck className="text-[green]" />,
          duration: 5000,
        });
      } else {
        state.isLoading = false;
        state.user = null;

        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);

        toast(payload.message, {
          icon: <AiOutlineClose className="text-[red]" />,
          duration: 5000,
        });
      }
    },

    forgotPasswordReducer: (state, { payload }) => {
      state.isLoading = true;

      if (payload.success) {
        state.isLoading = false;

        toast(payload.message, {
          icon: <AiOutlineCheck className="text-[green]" />,
          duration: 5000,
        });
      } else {
        state.isLoading = false;
        state.isUpdatedPassword = false;

        toast(payload.message, {
          icon: <AiOutlineClose className="text-[red]" />,
          duration: 5000,
        });
      }
    },
  },
});

export const loginReducerAsync = (formState) => async (dispatch) => {
  try {
    const res = await sendAPIRequest(
      `${BASE_URL_API}/login`,
      "POST",
      formState
    );
    dispatch(loginReducer(res));
  } catch (error) {
    console.log(error);
  }
};

export const forgotPasswordReducerAsync = (formState) => async (dispatch) => {
  try {
    const res = await sendAPIRequest(
      `${BASE_URL_API}/forgot-password`,
      "PUT",
      formState
    );
    dispatch(forgotPasswordReducer(res));
  } catch (error) {
    console.log(error);
  }
};

export const { loginReducer, forgotPasswordReducer } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
