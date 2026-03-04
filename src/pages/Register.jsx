import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import AuthLayout from "../components/AuthLayout.jsx";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    pin: "",
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
      await api.post("/user/create", {
        email: formData.email,
        password: formData.password,
        pin: formData.pin,
      });
      setSuccess("Account created. Please sign in to continue.");
      setFormData({ email: "", password: "", pin: "" });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Build your next bank"
      subtitle="Open a secure account with multi-layer authentication and instant access to your balance."
      footerText="Already have an account?"
      footerLink={{ to: "/login", label: "Sign in" }}
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink">Create account</h2>
          <span className="rounded-full bg-mist/70 px-3 py-1 text-xs font-semibold text-slate">
            New
          </span>
        </div>
        <p className="mt-2 text-sm text-slate">
          Set up your profile and secure pin in under a minute.
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
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="pin">
              6-digit PIN
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
                Sign in
              </Link>
            </div>
          ) : null}

          <button
            className="flex w-full items-center justify-center rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-mist/70 bg-slate-50 px-4 py-3 text-xs text-slate">
          Your PIN secures transfers and cash withdrawals.
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
