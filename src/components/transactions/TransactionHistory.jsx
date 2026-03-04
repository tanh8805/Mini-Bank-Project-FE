import { useMemo } from "react";
import StatusAlert from "../StatusAlert.jsx";

function TransactionHistory({ history, isLoading, error }) {
  const items = useMemo(() => history ?? [], [history]);

  const statusStyles = (status) => {
    if (status?.toLowerCase() === "success") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (status?.toLowerCase() === "pending") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-rose-50 text-rose-700 border-rose-200";
  };

  return (
    <div className="rounded-3xl border border-mist/70 bg-white/90 p-6 shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
            Hoạt động gần đây
          </p>
          <h3 className="mt-2 text-lg font-semibold text-ink">
            Lịch sử giao dịch
          </h3>
        </div>
        <span className="rounded-full border border-mist/70 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate">
          5 gần nhất
        </span>
      </div>

      {error ? <StatusAlert type="error" message={error} /> : null}

      <div className="mt-5 space-y-3">
        {isLoading ? (
          <div className="rounded-2xl border border-mist/70 bg-slate-50 px-4 py-4 text-sm text-slate">
            Đang tải lịch sử...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-mist/70 bg-slate-50 px-4 py-4 text-sm text-slate">
            Chưa có giao dịch.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.reference ?? item.createdAt}
              className="rounded-2xl border border-mist/70 bg-white px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {item.type ?? "Giao dịch"}
                  </p>
                  <p className="mt-1 text-xs text-slate">
                    {item.description || "Chuyển khoản ngân hàng"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-ink">
                    {item.amount
                      ? `$${Number(item.amount).toLocaleString()}`
                      : "--"}
                  </p>
                  <p className="mt-1 text-xs text-slate">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "--"}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate">
                <span>
                  Từ: {item.fromAccount ?? "--"}
                  {item.toAccount ? `| Đến: ${item.toAccount}` : ""}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-1 font-semibold ${statusStyles(
                    item.status,
                  )}`}
                >
                  {item.status ?? "Không rõ"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
