import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import AuthLayout from "../components/AuthLayout.jsx";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    pin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/user/create", {
        email: formData.email,
        password: formData.password,
        pin: formData.pin,
      });
      setSuccess("Tạo tài khoản thành công. Vui lòng đăng nhập để tiếp tục.");
      setFormData({ email: "", password: "", confirmPassword: "", pin: "" });
    } catch (err) {
      const message =
        err?.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Xây dựng ngân hàng của bạn"
      subtitle="Mở tài khoản an toàn với xác thực nhiều lớp và truy cập số dư ngay lập tức."
      footerText="Đã có tài khoản?"
      footerLink={{ to: "/login", label: "Đăng nhập" }}
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink">Tạo tài khoản</h2>
          <span className="rounded-full bg-mist/70 px-3 py-1 text-xs font-semibold text-slate">
            Mới
          </span>
        </div>
        <p className="mt-2 text-sm text-slate">
          Thiết lập hồ sơ và mã PIN bảo mật trong chưa đầy một phút.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="email">
              Email
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-mist/70 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
              id="email"
              name="email"
              type="email"
              placeholder="ten@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium text-ink"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <label className="flex items-center gap-2 text-xs text-slate">
                <input
                  className="h-4 w-4 rounded border-mist/70 text-ink focus:ring-ocean/30"
                  type="checkbox"
                  checked={showPassword}
                  onChange={(event) => setShowPassword(event.target.checked)}
                />
                Hiện mật khẩu
              </label>
            </div>
            <input
              className="mt-2 w-full rounded-2xl border border-mist/70 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ít nhất 8 ký tự"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium text-ink"
                htmlFor="confirmPassword"
              >
                Xác nhận mật khẩu
              </label>
              <label className="flex items-center gap-2 text-xs text-slate">
                <input
                  className="h-4 w-4 rounded border-mist/70 text-ink focus:ring-ocean/30"
                  type="checkbox"
                  checked={showConfirmPassword}
                  onChange={(event) =>
                    setShowConfirmPassword(event.target.checked)
                  }
                />
                Hiện mật khẩu
              </label>
            </div>
            <input
              className="mt-2 w-full rounded-2xl border border-mist/70 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="pin">
              PIN 6 chữ số
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-mist/70 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
              id="pin"
              name="pin"
              type="password"
              placeholder="******"
              value={formData.pin}
              onChange={handleChange}
              maxLength={6}
              required
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}{" "}
              <Link
                className="font-semibold text-ink hover:text-ocean"
                to="/login"
              >
                Đăng nhập
              </Link>
            </div>
          ) : null}

          <button
            className="flex w-full items-center justify-center rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-mist/70 bg-slate-50 px-4 py-3 text-xs text-slate">
          Mã PIN bảo vệ các giao dịch chuyển khoản và rút tiền mặt.
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
