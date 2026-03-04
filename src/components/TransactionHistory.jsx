function TransactionHistory({ transactions = [], isLoading, error }) {
  return (
    <section className="rounded-3xl border border-mist/70 bg-white/90 p-6 shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
            Recent activity
          </p>
          <h3 className="mt-2 text-lg font-semibold text-ink">
            Transaction history
          </h3>
        </div>
        <span className="rounded-full border border-mist/70 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate">
          Last 5
        </span>
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="mt-5 space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`history-skeleton-${index}`}
              className="rounded-2xl border border-mist/70 bg-white px-4 py-4"
            >
              <div className="animate-pulse space-y-3">
                <div className="h-3 w-32 rounded-full bg-slate-100" />
                <div className="h-3 w-56 rounded-full bg-slate-100" />
                <div className="h-3 w-40 rounded-full bg-slate-100" />
              </div>
            </div>
          ))
        ) : transactions.length === 0 ? (
          <div className="rounded-2xl border border-mist/70 bg-slate-50 px-4 py-4 text-sm text-slate">
            No transactions yet.
          </div>
        ) : (
          transactions.map((item) => {
            const amountValue = item.amount ? Number(item.amount) : null;
            const amountLabel =
              amountValue !== null && !Number.isNaN(amountValue)
                ? `$${amountValue.toLocaleString()}`
                : item.amount || "--";
            const dateLabel = item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : item.date || "--";
            const fromLabel = item.fromAccount || item.from || "--";
            const toLabel = item.toAccount || item.to || "--";
            const statusLabel = item.status || "SUCCESS";
            const statusTone = statusLabel.toLowerCase();
            const statusColor =
              statusTone === "success"
                ? "bg-emerald-500"
                : statusTone === "pending"
                  ? "bg-amber-400"
                  : "bg-rose-500";

            return (
              <div
                key={item.reference ?? item.id ?? item.createdAt}
                className="rounded-2xl border border-mist/70 bg-white px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusColor}`}
                      />
                      <p className="text-sm font-semibold text-ink">
                        {item.type ?? "TRANSACTION"}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-slate">
                      {item.description || "Banking transfer"}
                    </p>
                    <p className="mt-2 text-xs text-slate">
                      From: {fromLabel} | To: {toLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ink">
                      {amountLabel}
                    </p>
                    <p className="mt-1 text-xs text-slate">{dateLabel}</p>
                    <span className="mt-2 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {statusLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default TransactionHistory;
