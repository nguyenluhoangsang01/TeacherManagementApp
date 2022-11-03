import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginReducerAsync, selectAuth } from "../../features/auth/authSlice";
import { LOCAL_STORAGE_AUTH_KEY } from "../../utils/constants";
import { sendToast } from "../../utils/helpers";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const auth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  const [form, setForm] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  if (user || auth) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await dispatch(loginReducerAsync(form));

      setLoading(false);
    } catch (error) {
      sendToast(error.message, <AiOutlineClose className="text-[red]" />);

      setLoading(false);
    }
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="email">
          Email<sup>*</sup>
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          id="email"
          placeholder="Nhập email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Mật khẩu<sup>*</sup>
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          placeholder="Nhập mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="btn py-2 transition hover:scale-105 active:scale-100 mt-4 flex items-center justify-center"
        onClick={handleSubmit}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
        ) : (
          "Đăng nhập"
        )}
      </button>

      <div className="mt-60">
        <p className="text-center">
          Quên mật khẩu?{" "}
          <Link to="/auth/forgot-password" className="font-semibold underline">
            Thay đổi mật khẩu
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
