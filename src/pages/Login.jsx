import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import { Shield, KeyRound, CheckCircle2, AlertCircle, Info, Sparkles } from "lucide-react";

function Login() {
  const { isAuthenticated, loading, login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from =
    location.state && location.state.from
      ? `${location.state.from.pathname || "/"}${location.state.from.search || ""}`
      : "/";

  // PRN-based login state
  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");
  const [isManualPassword, setIsManualPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdminEmail, setShowAdminEmail] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Handle PRN change with strict 16-digit integer & starting with 2022 checks
  function handlePrnChange(e) {
    // Only accept numeric digits, maximum 16 digits
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 16);
    setPrn(digitsOnly);

    // Auto-fill default password as first 6 digits of that PRN if user hasn't typed custom password
    if (!isManualPassword) {
      if (digitsOnly.length >= 6 && digitsOnly.startsWith("2022")) {
        setPassword(digitsOnly.slice(0, 6));
      } else if (digitsOnly.length === 0) {
        setPassword("");
      }
    }

    // Live validation feedback
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
    if (prn.length >= 6 && prn.startsWith("2022")) {
      setPassword(prn.slice(0, 6));
      setIsManualPassword(false);
    }
  }

  function handleQuickFillDemo(demoPrn = "2022012345678901") {
    setPrn(demoPrn);
    setPassword(demoPrn.slice(0, 6));
    setIsManualPassword(false);
    setErrors({});
    setFormError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (showAdminEmail) {
      if (!adminEmail.trim() || !adminPassword) {
        setFormError("Please enter admin email and password.");
        return;
      }
      setIsSubmitting(true);
      try {
        await login(adminEmail.trim(), adminPassword);
        navigate(from, { replace: true });
      } catch (err) {
        setFormError(err.message || "Failed to log in.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const nextErrors = {};

    // Validate PRN
    if (!prn) {
      nextErrors.prn = "PRN is required.";
    } else if (!prn.startsWith("2022")) {
      nextErrors.prn = "PRN must start with 2022 (e.g., 2022012345678901).";
    } else if (prn.length !== 16) {
      nextErrors.prn = `PRN must be exactly 16 digits (currently ${prn.length} digits).`;
    }

    // Default password is first 6 digits of PRN
    const activePassword = password || (prn.length >= 6 ? prn.slice(0, 6) : "");
    if (!activePassword) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await login(prn, activePassword);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setFormError(
        (error && error.message) ||
          "Could not log in with this PRN. Please check your PRN and password."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full min-w-0 bg-paper">
        <div className="mx-auto w-full max-w-md px-4 py-16">
          <div
            className="rounded-card border border-line bg-surface p-8 text-center"
            role="status"
          >
            <p className="text-sm font-semibold text-mute">
              Checking your session…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const isPrnValidSoFar = prn.startsWith("2022") && prn.length === 16;

  return (
    <AuthLayout
      description="Government College of Engineering, Chandrapur"
      footer={
        <div className="text-center text-xs text-mute">
          <span>Need help? Contact </span>
          <span className="font-semibold text-ink">Campus Student Affairs</span>
          <span> or Lost &amp; Found Desk.</span>
        </div>
      }
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brick/10 text-brick">
          <Shield size={18} />
        </span>
        <h2 className="font-serif text-2xl font-bold text-ink">PRN Sign In</h2>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-mute">
        Enter your 16-digit university <strong>PRN</strong> starting with <strong>2022</strong>. The default password is the first 6 digits of that PRN.
      </p>

      {formError && (
        <div
          className="mt-5 rounded-lg border border-lost/30 bg-lost/10 p-4 text-sm text-lost"
          role="alert"
        >
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle size={16} />
            <span>Login failed</span>
          </div>
          <p className="mt-1 text-xs">{formError}</p>
        </div>
      )}

      {/* One-click demo test credentials */}
      <div className="mt-4 rounded-xl border border-line/70 bg-paper/60 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
            <Sparkles size={14} className="text-brick" />
            <span>Quick Test Demo PRN</span>
          </div>
          <button
            type="button"
            onClick={() => handleQuickFillDemo("2022012345678901")}
            className="rounded-md border border-brick/30 bg-brick/5 px-2.5 py-1 text-xs font-bold text-brick hover:bg-brick/10 cursor-pointer transition-colors"
          >
            Auto-Fill Demo
          </button>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-mute">
          <span>PRN: <strong className="text-ink">2022012345678901</strong></span>
          <span>&bull;</span>
          <span>Password: <strong className="text-ink">202201</strong></span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {!showAdminEmail ? (
          <>
            {/* PRN FIELD */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="login-prn"
                  className="block text-sm font-semibold text-ink"
                >
                  PRN (Permanent Registration Number)
                  <span className="ml-1 text-lost" aria-hidden="true">*</span>
                </label>
                <span
                  className={`font-mono text-xs ${
                    prn.length === 16 && prn.startsWith("2022")
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
                  placeholder="e.g. 2022012345678901"
                  maxLength={16}
                  required
                  aria-invalid={errors.prn ? "true" : "false"}
                  className={`w-full min-h-[46px] rounded-lg border font-mono px-3.5 py-2.5 text-sm text-ink placeholder:text-mute/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brick/20 ${
                    errors.prn
                      ? "border-lost bg-lost/5 focus:border-lost"
                      : isPrnValidSoFar
                      ? "border-canopy bg-found-tint/30 focus:border-canopy"
                      : "border-line bg-surface hover:border-mute/50 focus:border-brick"
                  }`}
                />
                {isPrnValidSoFar && (
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
                  <span>Must be a 16-digit integer starting with <strong>2022</strong></span>
                </p>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-ink"
                >
                  Password
                  <span className="ml-1 text-lost" aria-hidden="true">*</span>
                </label>

                {prn.length >= 6 && prn.startsWith("2022") && (
                  <button
                    type="button"
                    onClick={handleUseDefaultPassword}
                    className="text-xs text-brick hover:underline cursor-pointer"
                  >
                    Set to default ({prn.slice(0, 6)})
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
                    prn.length >= 6 && prn.startsWith("2022")
                      ? `Default: ${prn.slice(0, 6)}`
                      : "First 6 digits of PRN"
                  }
                  required
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`w-full min-h-[46px] rounded-lg border font-mono px-3.5 py-2.5 pr-12 text-sm text-ink placeholder:text-mute/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brick/20 ${
                    errors.password
                      ? "border-lost bg-lost/5 focus:border-lost"
                      : "border-line bg-surface hover:border-mute/50 focus:border-brick"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-3 text-mute hover:text-ink cursor-pointer text-xs font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
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
                    Default password is the first 6 digits of that PRN{" "}
                    {prn.startsWith("2022") && prn.length >= 6 ? (
                      <code className="rounded bg-paper px-1 py-0.5 font-bold text-brick">
                        {prn.slice(0, 6)}
                      </code>
                    ) : (
                      "(e.g. 202201)"
                    )}
                  </span>
                </p>
              )}
            </div>
          </>
        ) : (
          /* Secondary Admin Email Login */
          <>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink">
                Admin / Staff Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@gcoec.ac.in"
                className="w-full min-h-[46px] rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink"
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
                className="w-full min-h-[46px] rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink"
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="w-full min-h-[46px] text-base font-semibold"
        >
          {isSubmitting ? "Signing in with PRN…" : "Sign In with PRN"}
        </Button>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => {
              setShowAdminEmail((s) => !s);
              setFormError("");
            }}
            className="text-xs text-mute hover:text-brick underline cursor-pointer"
          >
            {showAdminEmail
              ? "← Back to Student PRN Login"
              : "Security Staff / Admin login"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;