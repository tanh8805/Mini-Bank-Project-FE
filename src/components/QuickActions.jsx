import { Link } from "react-router-dom";

const actionCardBase =
  "flex flex-col gap-2 rounded-3xl border border-mist/70 bg-white/90 p-5 shadow-glow transition hover:-translate-y-0.5";

function QuickActions() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <Link className={actionCardBase} to="/deposit">
        <span className="inline-flex w-fit rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">
          Nạp tiền
        </span>
        <p className="text-lg font-semibold text-ink">Nạp tiền</p>
        <p className="text-sm text-slate">Nạp thêm số dư ngay lập tức.</p>
      </Link>

      <Link className={actionCardBase} to="/withdraw">
        <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Rút tiền
        </span>
        <p className="text-lg font-semibold text-ink">Rút tiền</p>
        <p className="text-sm text-slate">Dùng mã PIN để rút tiền.</p>
      </Link>

      <Link className={actionCardBase} to="/transfer">
        <span className="inline-flex w-fit rounded-full bg-ocean/15 px-3 py-1 text-xs font-semibold text-ocean">
          Chuyển tiền
        </span>
        <p className="text-lg font-semibold text-ink">Gửi tiền</p>
        <p className="text-sm text-slate">Chuyển tiền đến tài khoản khác.</p>
      </Link>
    </section>
  );
}

export default QuickActions;
