import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      setSuccess("Login successful. You can now access your account.");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Review balances, move money, and stay on top of your banking in one secure place."
      footerText="New here?"
      footerLink={{ to: "/register", label: "Create an account" }}
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink">Sign in</h2>
          <span className="rounded-full bg-mist/70 px-3 py-1 text-xs font-semibold text-slate">
            Secure
          </span>
        </div>
        <p className="mt-2 text-sm text-slate">
          Use the email and password you registered with.
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
              placeholder="name@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="password">
              Password
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-mist/70 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
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
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-mist/70 bg-slate-50 px-4 py-3 text-xs text-slate">
          For demo use, ensure your backend is running on localhost:3000.
        </div>

        <div className="mt-4 text-center text-xs text-slate">
          Forgot your password?{" "}
          <Link
            className="font-semibold text-ink hover:text-ocean"
            to="/register"
          >
            Reset access
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
