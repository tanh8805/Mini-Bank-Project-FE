import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, children, footerText, footerLink }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-ocean/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-mint/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12 lg:flex-row lg:items-center lg:gap-10">
        <div className="w-full max-w-xl pb-10 lg:pb-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-mist/70 bg-white/80 px-4 py-2 text-sm font-medium text-ink shadow-sm">
            <span className="h-2 w-2 rounded-full bg-mint" />
            Trusted personal finance suite
          </div>
          <h1 className="font-display mt-6 text-4xl font-semibold text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-base text-slate md:text-lg">
            {subtitle}
          </p>

          <div className="mt-10 hidden rounded-3xl border border-mist/60 bg-white/70 p-6 shadow-glow backdrop-blur lg:block">
            <div className="flex items-center justify-between text-sm text-slate">
              <span>Instant balance snapshots</span>
              <span className="font-semibold text-ink">Live</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-mist/60 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate">
                  Checking
                </p>
                <p className="mt-2 text-xl font-semibold text-ink">$12,480</p>
              </div>
              <div className="rounded-2xl border border-mist/60 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate">
                  Savings
                </p>
                <p className="mt-2 text-xl font-semibold text-ink">$42,915</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg">
          <div className="rounded-3xl border border-mist/70 bg-white/90 p-8 shadow-glow backdrop-blur">
            {children}
          </div>
          <p className="mt-6 text-center text-sm text-slate">
            {footerText}{" "}
            <Link
              className="font-semibold text-ink hover:text-ocean"
              to={footerLink.to}
            >
              {footerLink.label}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
