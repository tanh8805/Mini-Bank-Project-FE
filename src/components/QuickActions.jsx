import { Link } from "react-router-dom";

const actionCardBase =
  "flex flex-col gap-2 rounded-3xl border border-mist/70 bg-white/90 p-5 shadow-glow transition hover:-translate-y-0.5";

function QuickActions() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <Link className={actionCardBase} to="/deposit">
        <span className="inline-flex w-fit rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">
          Deposit
        </span>
        <p className="text-lg font-semibold text-ink">Add funds</p>
        <p className="text-sm text-slate">Top up your balance instantly.</p>
      </Link>

      <Link className={actionCardBase} to="/withdraw">
        <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Withdraw
        </span>
        <p className="text-lg font-semibold text-ink">Cash out</p>
        <p className="text-sm text-slate">Use your PIN to withdraw.</p>
      </Link>

      <Link className={actionCardBase} to="/transfer">
        <span className="inline-flex w-fit rounded-full bg-ocean/15 px-3 py-1 text-xs font-semibold text-ocean">
          Transfer
        </span>
        <p className="text-lg font-semibold text-ink">Send money</p>
        <p className="text-sm text-slate">Move funds to another account.</p>
      </Link>
    </section>
  );
}

export default QuickActions;
