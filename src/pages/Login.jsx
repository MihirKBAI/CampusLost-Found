import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import { Shield, KeyRound, CheckCircle2, AlertCircle, Info, Sparkles, Eye, EyeOff } from "lucide-react";

// Valid PRN: 16-digit integer starting with 2022, 2023, 2024, 2025, or 2026
const PRN_RE = /^(2022|2023|2024|2025|2026)\d{12}$/;
const VALID_PREFIXES = ["2022", "2023", "2024", "2025", "2026"];

const DEMO_PRNS = [
  { batch: "2022", prn: "2022012345678901" },
  { batch: "2023", prn: "2023123456789012" },
  { batch: "2024", prn: "2024567890123456" },
  { batch: "2025", prn: "2025001122334455" },
  { batch: "2026", prn: "2026998877665544" },
];

function Login() {
  const { isAuthenticated, loading, login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from =
    location.state && location.state.from
      ? `${location.state.from.pathname || "/"}${location.state.from.search || ""}`
      : "/";

  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");
  const [isManualPassword, setIsManualPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Secondary admin sign-in toggle
  const [showAdminEmail, setShowAdminEmail] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Live sanitization: integer only, max 16 digits
  function handlePrnChange(e) {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 16);
    setPrn(digitsOnly);

    // Default password is the first 6 digits of that PRN
    if (!isManualPassword) {
      if (digitsOnly.length >= 6) {
        setPassword(digitsOnly.slice(0, 6));
      } else if (digitsOnly.length === 0) {
        setPassword("");
      }
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.prn;
      delete next.password;
      return next;
    });
    setFormError("");
  }

  function handlePasswordChange(e) {
    setIsManualPassword(true);
    setPassword(e.target.value);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.password;
      return next;
    });
    setFormError("");
  }

  function handleUseDefaultPassword() {
    if (prn.length >= 6) {
      setPassword(prn.slice(0, 6));
      setIsManualPassword(false);
    }
  }

  function handleQuickFillDemo(demoPrn) {
    setPrn(demoPrn);
    setPassword(demoPrn.slice(0, 6));
    setIsManualPassword(false);
    setErrors({});
    setFormError("");
  }

  const hasValidPrefix = VALID_PREFIXES.some((p) => prn.startsWith(p));
  const isPrnCompleteAndValid = PRN_RE.test(prn);

  async function handleSubmit(e) {
    e.preventDefault();

    // Staff/Admin email login handler
    if (showAdminEmail) {
      if (!adminEmail.trim() || !adminPassword) {
        setFormError("Please enter staff/admin email and password.");
        return;
      }
      setIsSubmitting(true);
      try {
        await login({ email: adminEmail.trim(), password: adminPassword });
        navigate(from, { replace: true });
      } catch (err) {
        setFormError(err.message || "Could not log in as admin.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // PRN Login validation
    const nextErrors = {};

    if (!prn) {
      nextErrors.prn = "PRN is required.";
    } else if (!hasValidPrefix) {
      nextErrors.prn = "PRN must start with 2022, 2023, 2024, 2025, or 2026.";
    } else if (prn.length !== 16) {
      nextErrors.prn = `PRN must be exactly 16 digits (currently ${prn.length} digits).`;
    }

    // Default password is first 6 digits of that PRN
    const activePassword = password || (prn.length >= 6 ? prn.slice(0, 6) : "");
    if (!activePassword) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await login({ prn, password: activePassword });
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setFormError(
        (error && error.message) ||
          "Could not sign in with this PRN. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex w-full min-w-0 flex-1 items-center justify-center bg-paper px-4 py-16">
        <div
          className="w-full max-w-md rounded-card border border-line bg-surface p-8 text-center"
          role="status"
        >
          <p className="text-sm font-semibold text-mute">
            Checking your session…
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const footer = (
    <div className="text-center text-xs text-mute">
      <span>GCOEC Lost &amp; Found Portal &bull; </span>
      <span>For assistance, contact the </span>
      <span className="font-semibold text-ink">Campus Security Office</span>.
    </div>
  );

  return (
    <AuthLayout
      description="Government College of Engineering, Chandrapur"
      footer={footer}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-control bg-brick/10 text-brick">
          <Shield size={19} />
        </span>
        <h1 className="type-title text-2xl font-bold text-ink">Sign In</h1>
      </div>

      <p className="mt-2 text-sm leading-6 text-mute">
        Enter your 16-digit university <strong>PRN</strong> (batches 2022–2026). The default password is the first 6 digits of your PRN.
      </p>

      {formError && (
        <div
          className="mt-4 rounded-control border border-lost/30 bg-lost/10 p-3.5 text-sm text-lost animate-alert-in"
          role="alert"
        >
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle size={16} />
            <span>Login failed</span>
          </div>
          <p className="mt-1 text-xs">{formError}</p>
        </div>
      )}

      {/* Quick-test demo batches */}
      {!showAdminEmail && (
        <div className="mt-4 rounded-card border border-line/70 bg-paper/60 p-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-semibold text-ink">
              <Sparkles size={13} className="text-brick" />
              <span>Quick Test Demo PRN:</span>
            </span>
            <span className="text-[11px] text-mute">Auto-fills 16-digit PRN &amp; password</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DEMO_PRNS.map((item) => (
              <button
                key={item.batch}
                type="button"
                onClick={() => handleQuickFillDemo(item.prn)}
                className={`rounded px-2.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
                  prn === item.prn
                    ? "bg-brick text-white font-bold"
                    : "border border-line bg-surface text-ink hover:bg-paper"
                }`}
              >
                Batch {item.batch}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        {!showAdminEmail ? (
          <>
            {/* PRN INPUT (Title: PRN) */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="login-prn"
                  className="block text-sm font-semibold text-ink"
                >
                  PRN
                  <span className="ml-1 text-lost" aria-hidden="true">*</span>
                </label>
                <span
                  className={`font-mono text-xs ${
                    isPrnCompleteAndValid
                      ? "font-bold text-canopy"
                      : "text-mute"
                  }`}
                >
                  {prn.length} / 16 digits
                </span>
              </div>

              <div className="relative">
                <input
                  id="login-prn"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="prn"
                  value={prn}
                  onChange={handlePrnChange}
                  autoComplete="username"
                  placeholder="e.g. 2024123456789012"
                  maxLength={16}
                  required
                  aria-invalid={errors.prn ? "true" : "false"}
                  className={`w-full min-h-[44px] rounded-control border font-mono px-3.5 py-2.5 text-sm text-ink placeholder:text-mute/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    errors.prn
                      ? "border-lost bg-lost/5"
                      : isPrnCompleteAndValid
                      ? "border-canopy bg-found/5"
                      : "border-line bg-surface hover:border-mute/40"
                  }`}
                />
                {isPrnCompleteAndValid && (
                  <span className="pointer-events-none absolute right-3 top-3 text-canopy">
                    <CheckCircle2 size={18} />
                  </span>
                )}
              </div>

              {errors.prn ? (
                <p className="mt-1.5 text-xs font-semibold text-lost">
                  {errors.prn}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-mute flex items-center gap-1">
                  <Info size={12} className="shrink-0" />
                  <span>
                    Must be a 16-digit integer starting with{" "}
                    <strong>2022, 2023, 2024, 2025, or 2026</strong>.
                  </span>
                </p>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-ink"
                >
                  Password
                  <span className="ml-1 text-lost" aria-hidden="true">*</span>
                </label>

                {prn.length >= 6 && hasValidPrefix && (
                  <button
                    type="button"
                    onClick={handleUseDefaultPassword}
                    className="text-xs text-primary hover:underline cursor-pointer"
                  >
                    Use default ({prn.slice(0, 6)})
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  placeholder={
                    prn.length >= 6 && hasValidPrefix
                      ? `Default: ${prn.slice(0, 6)}`
                      : "First 6 digits of PRN"
                  }
                  required
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`w-full min-h-[44px] rounded-control border font-mono px-3.5 py-2.5 pr-12 text-sm text-ink placeholder:text-mute/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    errors.password
                      ? "border-lost bg-lost/5"
                      : "border-line bg-surface hover:border-mute/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-3 text-mute hover:text-ink cursor-pointer text-xs font-medium"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errors.password ? (
                <p className="mt-1.5 text-xs font-semibold text-lost">
                  {errors.password}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-mute flex items-center gap-1">
                  <KeyRound size={12} className="shrink-0" />
                  <span>
                    Default password is the first 6 digits of your PRN{" "}
                    {prn.length >= 6 && hasValidPrefix ? (
                      <code className="rounded bg-paper px-1 py-0.5 font-bold text-ink">
                        {prn.slice(0, 6)}
                      </code>
                    ) : (
                      "(e.g. 202412)"
                    )}
                  </span>
                </p>
              )}
            </div>
          </>
        ) : (
          /* Secondary staff / admin email sign-in */
          <>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Staff / Admin Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@gcoec.ac.in"
                className="w-full min-h-[44px] rounded-control border border-line bg-surface px-3.5 py-2.5 text-sm text-ink"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="admin123"
                className="w-full min-h-[44px] rounded-control border border-line bg-surface px-3.5 py-2.5 text-sm text-ink"
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="w-full min-h-[44px] text-base font-semibold"
        >
          {isSubmitting
            ? "Signing in..."
            : showAdminEmail
            ? "Sign In as Admin"
            : "Sign In with PRN"}
        </Button>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => {
              setShowAdminEmail((s) => !s);
              setFormError("");
            }}
            className="text-xs text-mute hover:text-ink underline cursor-pointer"
          >
            {showAdminEmail
              ? "&larr; Return to Student PRN Login"
              : "Staff / Administrator Sign In"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
