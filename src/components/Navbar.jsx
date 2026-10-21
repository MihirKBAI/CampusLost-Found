import { useContext, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BrandMark from "./BrandMark";

function navLinkClass({ isActive }) {
  return [
    "inline-flex min-h-[44px] items-center border-b-2 px-1 text-[0.95rem] font-medium transition-colors duration-200",
    isActive
      ? "border-brick text-brick font-semibold"
      : "border-transparent text-ink/75 hover:text-ink hover:border-line",
  ].join(" ");
}

function accountLinkClass({ isActive }) {
  return [
    "block min-h-[40px] px-3 py-2 text-sm font-medium transition-colors duration-200",
    isActive ? "bg-paper text-ink" : "text-ink hover:bg-paper",
  ].join(" ");
}

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const menuId = useId();
  const accountId = useId();
  const reportId = useId();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const accountRef = useRef(null);
  const reportRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const firstLink = menuRef.current?.querySelector("a");
    firstLink?.focus();
  }, [menuOpen]);

  useEffect(() => {
    if (!accountOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!accountRef.current?.contains(event.target)) {
        setAccountOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setAccountOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountOpen]);

  useEffect(() => {
    if (!reportOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!reportRef.current?.contains(event.target)) {
        setReportOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setReportOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [reportOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
    setReportOpen(false);
  }

  function handleLogout() {
    closeMenu();
    setAccountOpen(false);
    navigate("/");
    logout().catch(() => {});
  }

  const desktopNav = [
    { to: "/", label: "Home", end: true },
    { to: "/lost-items", label: "Lost Items", end: false },
    { to: "/found-items", label: "Found Items", end: false },
    { to: "/cctv", label: "CCTV", end: false, isLive: true },
  ];

  return (
    <header className="border-b border-line bg-paper sticky top-0 z-30">
      <nav className="mx-auto w-full max-w-[1440px] px-4 sm:px-8" aria-label="Primary">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <Link
            to="/"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2.5 rounded-lg pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            onClick={closeMenu}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brick text-white shadow-xs">
              <BrandMark size={22} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg font-bold text-ink">
                CampusFind
              </span>
              <span className="mt-0.5 whitespace-nowrap text-[11px] font-semibold tracking-wide text-mute">
                GCOEC &bull; Chandrapur
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-4 lg:flex xl:gap-5">
            {desktopNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}
              >
                <span>{item.label}</span>
                {item.isLive ? (
                  <span className="ml-1.5 flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Live CCTV Surveillance" />
                ) : null}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <NavLink to="/recovery-requests" className={navLinkClass}>
                Recovery Requests
              </NavLink>
            ) : null}
          </div>

          <div className="hidden items-center gap-2 lg:flex xl:gap-2.5">
            <div className="relative" ref={reportRef}>
              <button
                type="button"
                aria-expanded={reportOpen}
                aria-controls={reportId}
                onClick={() => setReportOpen((open) => !open)}
                className="inline-flex min-h-[40px] cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-ink shadow-2xs transition-colors duration-200 hover:bg-paper"
              >
                Report
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${
                    reportOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>
              {reportOpen && (
                <div
                  id={reportId}
                  className="absolute right-0 z-20 mt-2 w-60 animate-menu-in overflow-hidden rounded-control border border-line bg-surface py-1 shadow-md shadow-black/15"
                >
                  <Link
                    to="/report-lost"
                    onClick={closeMenu}
                    className="flex min-h-[40px] items-center gap-2.5 px-3 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:bg-paper"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-lost"
                      aria-hidden="true"
                    />
                    Report a lost item
                  </Link>
                  <Link
                    to="/report-found"
                    onClick={closeMenu}
                    className="flex min-h-[40px] items-center gap-2.5 px-3 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:bg-paper"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-found"
                      aria-hidden="true"
                    />
                    Report a found item
                  </Link>
                </div>
              )}
            </div>
            {isAuthenticated ? (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  aria-expanded={accountOpen}
                  aria-controls={accountId}
                  onClick={() => setAccountOpen((open) => !open)}
                  className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 justify-center rounded-lg border border-line bg-surface px-3.5 text-sm font-semibold text-ink shadow-2xs transition-colors duration-200 hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  My Account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m6 9 6 6 6-6"
                    />
                  </svg>
                </button>
                {accountOpen && (
                  <div
                    id={accountId}
                    className="absolute right-0 z-20 mt-2 w-52 animate-menu-in overflow-hidden rounded-control border border-line bg-surface py-1 shadow-md shadow-black/15"
                  >
                    <NavLink
                      to="/my-reports"
                      onClick={closeMenu}
                      className={accountLinkClass}
                    >
                      My Reports
                    </NavLink>
                    <div className="my-1 border-t border-line" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full min-h-[40px] px-3 py-2 text-left text-sm font-medium text-lost hover:bg-paper"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex min-h-[40px] cursor-pointer items-center justify-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-ink shadow-2xs transition-colors duration-200 hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                Login
              </Link>
            )}
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-lg border border-line bg-surface text-ink lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div
            id={menuId}
            ref={menuRef}
            className="border-t border-line pb-4 pt-2 animate-menu-in lg:hidden bg-paper"
          >
            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "flex min-h-[44px] items-center rounded-control px-3 text-base font-medium",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/lost-items"
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "flex min-h-[44px] items-center rounded-control px-3 text-base font-medium",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                Lost Items
              </NavLink>
              <NavLink
                to="/found-items"
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "flex min-h-[44px] items-center rounded-control px-3 text-base font-medium",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                Found Items
              </NavLink>
              <NavLink
                to="/cctv"
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "flex min-h-[44px] items-center justify-between rounded-control px-3 text-base font-medium",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                <span>CCTV</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/recovery-requests"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      [
                        "flex min-h-[44px] items-center rounded-control px-3 text-base font-medium",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/65 hover:bg-white/5 hover:text-white",
                      ].join(" ")
                    }
                  >
                    Recovery Requests
                  </NavLink>
                  <NavLink
                    to="/my-reports"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      [
                        "flex min-h-[44px] items-center rounded-control px-3 text-base font-medium",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/65 hover:bg-white/5 hover:text-white",
                      ].join(" ")
                    }
                  >
                    My Reports
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "flex min-h-[44px] items-center rounded-control px-3 text-base font-medium",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/65 hover:bg-white/5 hover:text-white",
                    ].join(" ")
                  }
                >
                  Login
                </NavLink>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/report-lost"
                onClick={closeMenu}
                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-control bg-lost px-4 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-lost-dark"
              >
                Report Lost
              </Link>
              <Link
                to="/report-found"
                onClick={closeMenu}
                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-control bg-found px-4 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-found-dark"
              >
                Report Found
              </Link>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex min-h-[44px] cursor-pointer items-center rounded-control px-3 text-base font-medium text-white/65 hover:bg-white/5 hover:text-white"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;