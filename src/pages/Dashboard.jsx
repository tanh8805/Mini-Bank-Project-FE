import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  EyeOff,
  Send,
} from "lucide-react";
import api from "../api/axios.js";

function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const formattedBalance = useMemo(() => {
    if (balance === null || balance === undefined) {
      return "--";
    }
    const numericValue = Number(balance);
    if (Number.isNaN(numericValue)) {
      return balance;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(numericValue);
  }, [balance]);

  const fetchAccountSummary = async () => {
    setIsLoading(true);
    setError("");

    try {
      const [balanceResponse, accountResponse] = await Promise.all([
        api.get("/user-info/balance"),
        api.get("/user-info/account-number"),
      ]);
      setBalance(balanceResponse?.data?.balance ?? null);
      setAccountNumber(accountResponse?.data?.userAccountNumber ?? "");
      setLastUpdated(new Date());
    } catch (err) {
      const message =
        err?.response?.data?.message || "Không thể tải thông tin tài khoản.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchAccountSummary();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    fetchAccountSummary();
  }, []);

  const maskedAccount = useMemo(() => {
    if (!accountNumber) {
      return "--";
    }
    const sanitized = accountNumber.replace(/\s+/g, "");
    const lastFour = sanitized.slice(-4);
    return `**** **** ${lastFour}`;
  }, [accountNumber]);

  const balanceLabel = showBalance
    ? isLoading
      ? "Đang tải..."
      : formattedBalance
    : "******";

  const accountLabel = showAccount ? accountNumber || "--" : maskedAccount;

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-400"
              >
                <path
                  d="M12 30L24 10L36 30"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 30H32L24 42L16 30Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                NGÂN HÀNG MINI
              </p>
              <h1 className="text-2xl font-semibold">
                Bảng điều khiển ngân hàng
              </h1>
              <p className="text-sm text-slate-400">
                Theo dõi số dư, chuyển tiền và điều chuyển quỹ tức thì.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-white"
              type="button"
              onClick={handleRefresh}
            >
              Làm mới
            </button>
            <button
              className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              type="button"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </header>

        {error ? (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-slate-400">Tổng số dư</p>
              <div className="mt-2 flex items-center gap-3">
                <p className="text-3xl font-semibold md:text-4xl">
                  {balanceLabel}
                </p>
                <button
                  className="rounded-2xl border border-slate-700 bg-slate-900 px-2.5 py-2 text-slate-300 transition hover:text-slate-100"
                  type="button"
                  onClick={() => setShowBalance((prev) => !prev)}
                  aria-label={showBalance ? "Ẩn số dư" : "Hiện số dư"}
                >
                  {showBalance ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <p className="text-xs text-slate-400">Số tài khoản</p>
                <p className="text-sm font-semibold text-slate-100">
                  {accountLabel}
                </p>
                <button
                  className="rounded-2xl border border-slate-700 bg-slate-900 px-2 py-1 text-slate-300 transition hover:text-slate-100"
                  type="button"
                  onClick={() => setShowAccount((prev) => !prev)}
                  aria-label={
                    showAccount ? "Ẩn số tài khoản" : "Hiện số tài khoản"
                  }
                >
                  {showAccount ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Trạng thái
              </p>
              <p className="mt-3 text-sm font-semibold text-emerald-300">
                {isLoading ? "Đang tải" : "Hoạt động"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Cập nhật {lastUpdated ? lastUpdated.toLocaleTimeString() : "--"}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Thao tác nhanh
              </p>
              <h2 className="mt-2 text-xl font-semibold">Chuyển tiền nhanh</h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Link
              to="/deposit"
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-emerald-400/60 hover:bg-slate-900/80"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 transition group-hover:scale-105">
                <ArrowDownToLine className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">Nạp tiền</p>
              <p className="mt-1 text-sm text-slate-400">
                Nạp tiền vào tài khoản ngay lập tức.
              </p>
            </Link>

            <Link
              to="/withdraw"
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-amber-300/60 hover:bg-slate-900/80"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-200 transition group-hover:scale-105">
                <ArrowUpFromLine className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">Rút tiền</p>
              <p className="mt-1 text-sm text-slate-400">
                Rút tiền bằng mã PIN bảo mật.
              </p>
            </Link>

            <Link
              to="/transfer"
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-sky-400/60 hover:bg-slate-900/80"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300 transition group-hover:scale-105">
                <Send className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">Chuyển tiền</p>
              <p className="mt-1 text-sm text-slate-400">
                Chuyển tiền đến tài khoản khác.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
