import React, { useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { BASE_URL_API } from "../../utils/constants";
import { sendAPIRequest, sendToast } from "../../utils/helpers";

const initialValue = {
  email: "",
  password: "",
  confirmPassword: "",
  role: "teacher",
};

const Register = () => {
  const [form, setForm] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await sendAPIRequest(
        `${BASE_URL_API}/register`,
        "POST",
        form
      );

      if (res.success) {
        sendToast(res.message, <AiOutlineCheck className="text-[green]" />);

        setForm(initialValue);
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

      <div className="form-group">
        <label htmlFor="role">Vai trò</label>
        <select
          className="form-control"
          name="role"
          id="role"
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="teacher">Giảng viên</option>
          <option value="headOfSubject">Trưởng bộ môn</option>
          <option value="boardOfDirectors">Ban chủ nhiệm khoa</option>
          <option value="admin">Quản trị viên</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn py-2 transition hover:scale-105 active:scale-100 mt-4 flex items-center justify-center"
        onClick={handleSubmit}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
        ) : (
          "Đăng ký"
        )}
      </button>

      <div className="mt-24">
        <p className="text-center">
          Quay lại trang chủ?{" "}
          <Link to="/" className="font-semibold underline">
            Trang chủ
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
