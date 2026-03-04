import { Link } from "react-router-dom";
import DepositForm from "../components/transactions/DepositForm.jsx";

function Deposit() {
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Link
          className="text-sm font-semibold text-ink hover:text-ocean"
          to="/dashboard"
        >
          ← Quay lại Bảng điều khiển
        </Link>
        <div className="rounded-3xl border border-mist/70 bg-white/90 p-8 shadow-glow">
          <DepositForm />
        </div>
      </div>
    </div>
  );
}

export default Deposit;
