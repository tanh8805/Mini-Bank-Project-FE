import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const linkBase =
  "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition";

function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navContent = (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
          Mini Bank
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Navigation</h2>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-ink text-white shadow-glow"
                : "text-slate hover:bg-mist/40"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-ink text-white shadow-glow"
                : "text-slate hover:bg-mist/40"
            }`
          }
        >
          Transaction History
        </NavLink>
        <div className="mt-4 border-t border-mist/70 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
            Quick actions
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <NavLink
              to="/deposit"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "bg-mint/20 text-ink"
                    : "text-slate hover:bg-mint/10"
                }`
              }
            >
              Deposit
            </NavLink>
            <NavLink
              to="/withdraw"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "bg-amber-100 text-ink"
                    : "text-slate hover:bg-amber-50"
                }`
              }
            >
              Withdraw
            </NavLink>
            <NavLink
              to="/transfer"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "bg-ocean/15 text-ink"
                    : "text-slate hover:bg-ocean/10"
                }`
              }
            >
              Transfer
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-mist/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
        <button
          className="rounded-2xl border border-mist/70 bg-white px-3 py-2 text-sm font-semibold text-ink"
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open navigation"
        >
          Menu
        </button>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
            Mini Bank
          </p>
          <p className="text-sm font-semibold text-ink">Dashboard</p>
        </div>
      </header>

      {isDrawerOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="absolute inset-0 h-full w-full bg-slate-900/30"
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close navigation"
          />
          <div className="relative z-50 h-full w-72 rounded-r-3xl border border-mist/60 bg-white/95 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Navigation</p>
              <button
                className="rounded-2xl border border-mist/70 bg-white px-3 py-1 text-xs font-semibold text-ink"
                type="button"
                onClick={() => setIsDrawerOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-6">{navContent}</div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-6 py-8">
        <aside className="sticky top-8 hidden h-[calc(100vh-4rem)] w-64 flex-col gap-6 rounded-3xl border border-mist/60 bg-white/80 p-6 shadow-glow backdrop-blur lg:flex">
          {navContent}
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
