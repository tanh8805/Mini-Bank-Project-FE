function AccountOverview({
  balance,
  accountNumber,
  status,
  lastUpdated,
  isLoading,
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-mist/60 bg-gradient-to-br from-white via-sky-50 to-blue-100/60 p-8 shadow-glow">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-28 rounded-full bg-slate-100" />
            <div className="h-10 w-48 rounded-2xl bg-slate-200" />
            <div className="h-3 w-40 rounded-full bg-slate-100" />
            <div className="mt-4 h-20 rounded-2xl border border-mist/70 bg-white/60" />
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate">Total balance</p>
              <p className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
                {balance}
              </p>
              <p className="mt-2 text-xs text-slate">
                Account number: {accountNumber}
              </p>
            </div>
            <div className="rounded-2xl border border-mist/70 bg-white/80 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate">
                Status
              </p>
              <p className="mt-3 text-sm font-semibold text-ink">{status}</p>
              <p className="mt-1 text-xs text-slate">Updated {lastUpdated}</p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-mist/70 bg-white/90 p-8 shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
          Insights
        </p>
        <div className="mt-5 divide-y divide-mist/70 text-sm text-slate">
          <div className="py-3">Balance updates every 60 seconds.</div>
          <div className="py-3">Transfers require a secure PIN.</div>
          <div className="py-3">History shows your latest 5 actions.</div>
        </div>
      </div>
    </section>
  );
}

export default AccountOverview;
