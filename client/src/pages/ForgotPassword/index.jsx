import React, { useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/auth/authSlice";
import { BASE_URL_API } from "../../utils/constants";
import { sendAPIRequest, sendToast } from "../../utils/helpers";

const initialValue = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ForgotPassword = () => {
  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await sendAPIRequest(
        `${BASE_URL_API}/auth/forgot-password`,
        "PUT",
        form
      );

      if (res.success) {
        sendToast(res.message, <AiOutlineCheck className="text-[green]" />);

        setForm(initialValue);

        navigate("/auth/login", { replace: true });
      } else {
        sendToast(res.message, <AiOutlineClose className="text-[red]" />);
      }

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

      <div className="form-group">
        <label htmlFor="confirmPassword">
          Xác nhận mật khẩu<sup>*</sup>
        </label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Nhập xác nhận mật khẩu"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
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
          "Thay đổi"
        )}
      </button>

      <div className="mt-40">
        <p className="text-center">
          Quay lại đăng nhập?{" "}
          <Link to="/auth/login" className="font-semibold underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPassword;
