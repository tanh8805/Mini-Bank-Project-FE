function DashboardHeader({ onRefresh, onSignOut }) {
  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-mist/60 bg-white/80 p-6 shadow-glow backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
          Account overview
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-ink md:text-4xl">
          Your banking dashboard
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate md:text-base">
          Monitor balances, send transfers, and move funds instantly.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="rounded-2xl border border-mist/70 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
          type="button"
          onClick={onRefresh}
        >
          Refresh
        </button>
        <button
          className="rounded-2xl bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          type="button"
          onClick={onSignOut}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
