import { useState } from "react";
import api from "../../api/axios.js";
import StatusAlert from "../StatusAlert.jsx";

function DepositForm({ onBalanceUpdate, onHistoryUpdate }) {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await api.post("/transaction/deposit", {
        amount: Number(amount),
      });
      const message = response?.data?.message || "Nạp tiền thành công.";
      setStatus({ type: "success", message });
      setAmount("");
      onBalanceUpdate?.(response?.data?.balance);
      onHistoryUpdate?.();
    } catch (err) {
      const message =
        err?.response?.data?.message || "Nạp tiền thất bại. Vui lòng thử lại.";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-mist/70 bg-white/90 p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-ink">Nạp tiền</h3>
        <span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">
          Nạp tiền
        </span>
      </div>
      <p className="mt-2 text-sm text-slate">
        Chuyển tiền vào tài khoản trong vài giây.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="text-sm font-medium text-ink"
            htmlFor="depositAmount"
          >
            Số tiền
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-mist/70 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
            id="depositAmount"
            name="depositAmount"
            type="number"
            min="1"
            step="0.01"
            placeholder="2000"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </div>

        <StatusAlert type={status.type} message={status.message} />

        <button
          className="flex w-full items-center justify-center rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang nạp tiền..." : "Nạp tiền"}
        </button>
      </form>
    </div>
  );
}

export default DepositForm;
