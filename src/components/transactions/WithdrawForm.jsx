import { useState } from "react";
import api from "../../api/axios.js";
import StatusAlert from "../StatusAlert.jsx";

function WithdrawForm({ onBalanceUpdate, onHistoryUpdate }) {
  const [formData, setFormData] = useState({ amount: "", pin: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await api.post("/transaction/with-draw", {
        amount: Number(formData.amount),
        pin: formData.pin,
      });
      const message = response?.data?.message || "Rút tiền thành công.";
      setStatus({ type: "success", message });
      setFormData({ amount: "", pin: "" });
      onBalanceUpdate?.(response?.data?.balance);
      onHistoryUpdate?.();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Rút tiền thất bại. Vui lòng kiểm tra mã PIN.";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-mist/70 bg-white/90 p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-ink">Rút tiền</h3>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Rút tiền
        </span>
      </div>
      <p className="mt-2 text-sm text-slate">Rút tiền bằng mã PIN 6 chữ số.</p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="text-sm font-medium text-ink"
            htmlFor="withdrawAmount"
          >
            Số tiền
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-mist/70 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
            id="withdrawAmount"
            name="amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="500"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink" htmlFor="withdrawPin">
            PIN
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-mist/70 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
            id="withdrawPin"
            name="pin"
            type="password"
            inputMode="numeric"
            maxLength={6}
            placeholder="******"
            value={formData.pin}
            onChange={handleChange}
            required
          />
        </div>

        <StatusAlert type={status.type} message={status.message} />

        <button
          className="flex w-full items-center justify-center rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang rút tiền..." : "Rút tiền"}
        </button>
      </form>
    </div>
  );
}

export default WithdrawForm;
