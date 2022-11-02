import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPasswordReducerAsync } from "../../features/auth/authSlice";

const initialValue = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPasswordReducerAsync(form));

    setForm(initialValue);
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
        <span className="error-message"></span>
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
        <span className="error-message"></span>
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
          placeholder="Nhập lại mật khẩu"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />
        <span className="error-message"></span>
      </div>

      <button
        type="submit"
        className="btn py-2 transition hover:scale-105 active:scale-100 mt-4"
        onClick={handleSubmit}
      >
        Gửi đi
      </button>

      <div className="mt-40">
        <p className="text-center">
          Quay lại đăng nhập?{" "}
          <Link to="/auth/login" className="font-semibold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPassword;
