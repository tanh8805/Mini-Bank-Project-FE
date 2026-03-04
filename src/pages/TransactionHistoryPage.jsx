import { useEffect, useState } from "react";
import TransactionHistory from "../components/TransactionHistory.jsx";
import api from "../api/axios.js";
import StatusAlert from "../components/StatusAlert.jsx";

function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await api.get("/transaction/history");
      setTransactions(response?.data?.history ?? []);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Không thể tải lịch sử giao dịch.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
              Lịch sử
            </p>
            <h1 className="font-display mt-2 text-3xl font-semibold text-ink">
              Lịch sử giao dịch
            </h1>
          </div>
          <button
            className="rounded-2xl border border-mist/70 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
            type="button"
            onClick={fetchHistory}
          >
            Làm mới
          </button>
        </div>

        {error ? <StatusAlert type="error" message={error} /> : null}

        <TransactionHistory
          transactions={transactions}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

export default TransactionHistoryPage;
