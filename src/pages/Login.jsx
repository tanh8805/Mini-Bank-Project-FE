import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import AuthLayout from "../components/AuthLayout.jsx";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [info, setInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/user/login", formData);
      const token = response?.data?.token || response?.data?.data?.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }
      setSuccess(
        "Đăng nhập thành công. Bạn có thể truy cập tài khoản của mình.",
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Chào mừng trở lại"
      subtitle="Xem số dư, chuyển tiền và quản lý tài chính an toàn trong một nơi."
      footerText="Chưa có tài khoản?"
      footerLink={{ to: "/register", label: "Tạo tài khoản" }}
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink">Đăng nhập</h2>
          <span className="rounded-full bg-mist/70 px-3 py-1 text-xs font-semibold text-slate">
            Bảo mật
          </span>
        </div>
        <p className="mt-2 text-sm text-slate">
          Sử dụng email và mật khẩu bạn đã đăng ký.
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
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
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
              {success}
            </div>
          ) : null}

          <button
            className="flex w-full items-center justify-center rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate">
          Quên mật khẩu?{" "}
          <button
            className="font-semibold text-ink hover:text-ocean"
            type="button"
            onClick={() => setInfo("Đang trong quá trình phát triển")}
          >
            Khôi phục truy cập
          </button>
        </div>
        {info ? (
          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
            {info}
          </div>
        ) : null}
      </div>
    </AuthLayout>
  );
}

export default Login;
