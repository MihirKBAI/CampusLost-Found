import { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BrandMark from "../components/BrandMark";
import ItemCard from "../components/ItemCard";
import { LostItemContext } from "../context/LostItemContext";
import { FoundItemContext } from "../context/FoundItemContext";
import {
  SearchIcon,
  ArrowRightIcon,
  LostIcon,
  FoundIcon,
  ReportIcon,
  MatchIcon,
  VerifyIcon,
  RecoverIcon,
  CampusIcon,
  ShieldIcon,
} from "../components/icons";
import { Camera, Check, Search } from "lucide-react";

const POPULAR_CATEGORIES = ["Electronics", "Keys", "Documents", "Books"];

const RECOVERY_STEPS = [
  {
    icon: ReportIcon,
    title: "Report",
    description: "Add what was lost or found so people on campus can see it.",
  },
  {
    icon: MatchIcon,
    title: "Match",
    description: "Possible matches connect found items with reports of what students have lost.",
  },
  {
    icon: VerifyIcon,
    title: "Verify",
    description: "A recovery request helps confirm ownership before the item changes hands.",
  },
  {
    icon: RecoverIcon,
    title: "Recover",
    description: "The item is returned and the listing is marked as recovered.",
  },
];

const containerClass = "mx-auto w-full min-w-0 max-w-[1440px] px-4 sm:px-8";

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("all");
  const [recentTab, setRecentTab] = useState("all");

  const {
    lostItems,
    isLoading: lostLoading,
    updateLostItem,
    deleteLostItem,
  } = useContext(LostItemContext);

  const {
    foundItems,
    isLoading: foundLoading,
    updateFoundItem,
    deleteFoundItem,
  } = useContext(FoundItemContext);

  // Compute recently reported items
  const recentItems = useMemo(() => {
    const lost = (lostItems || []).map((i) => ({ ...i, itemType: "lost" }));
    const found = (foundItems || []).map((i) => ({ ...i, itemType: "found" }));

    if (recentTab === "lost") return lost.slice(0, 6);
    if (recentTab === "found") return found.slice(0, 6);

    // Merge and sort
    const combined = [...lost, ...found].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.dateLost || a.dateFound || 0).getTime();
      const dateB = new Date(b.createdAt || b.dateLost || b.dateFound || 0).getTime();
      return dateB - dateA;
    });
    return combined.slice(0, 6);
  }, [lostItems, foundItems, recentTab]);

  function handleSearch() {
    const targetScope = scope === "found" ? "found" : "lost";
    const key = `campusfind:${targetScope}:search`;
    if (query.trim()) {
      sessionStorage.setItem(key, query.trim());
    }
    navigate(`/${targetScope}-items`);
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function handleCategoryClick(cat) {
    const targetScope = scope === "found" ? "found" : "lost";
    sessionStorage.setItem(`campusfind:${targetScope}:category`, cat);
    navigate(`/${targetScope}-items`);
  }

  return (
    <div className="w-full min-w-0 overflow-x-clip bg-paper text-ink font-sans">
      {/* 1. HERO SECTION — Warm cream background matching image_7a3f381f.png */}
      <section className="bg-paper pb-12 pt-8 sm:pb-16 sm:pt-12" aria-labelledby="hero-title">
        <div className={containerClass}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Statement, Title & Buttons */}
            <div className="min-w-0 lg:col-span-7">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1 text-xs font-semibold tracking-wider text-brick shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-brick" aria-hidden="true" />
                <span>GCOEC &bull; CAMPUS LOST &amp; FOUND</span>
              </div>

              {/* Brand Logo & Title Row */}
              <div className="mt-5 flex items-center gap-4 sm:gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brick text-white shadow-sm sm:h-20 sm:w-20">
                  <BrandMark size={44} />
                </div>
                <h1
                  id="hero-title"
                  className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-[4.25rem] leading-none"
                >
                  CampusFind
                </h1>
              </div>

              {/* Subheading in Serif */}
              <h2 className="mt-6 font-serif text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                Report, match, and recover lost belongings on campus.
              </h2>

              {/* Description in Sans */}
              <p className="mt-4 max-w-xl text-base leading-relaxed text-mute">
                CampusFind is a campus lost-and-found platform for Government College of
                Engineering, Chandrapur. Report what you misplaced, browse turned-in
                belongings, and request recovery through the admin review process.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/report-lost"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-brick px-5 text-[15px] font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-brick-hover"
                >
                  <Search size={17} />
                  <span>Report a Lost Item</span>
                </Link>

                <Link
                  to="/report-found"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-canopy px-5 text-[15px] font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-canopy-hover"
                >
                  <Check size={18} strokeWidth={2.4} />
                  <span>Report a Found Item</span>
                </Link>

                <Link
                  to="/lost-items"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-line bg-surface px-5 text-[15px] font-semibold text-ink shadow-xs transition-colors duration-200 hover:bg-paper"
                >
                  <span>Browse Listings</span>
                </Link>
              </div>
            </div>

            {/* Right: Search Card with Scope Tabs & Category Pills */}
            <div className="min-w-0 lg:col-span-5">
              <div className="w-full rounded-2xl border border-line/70 bg-surface p-6 shadow-sm">
                {/* Segmented control: All / Lost / Found */}
                <div
                  role="group"
                  aria-label="Filter search scope"
                  className="grid grid-cols-3 gap-1 rounded-xl bg-paper p-1 text-sm font-semibold"
                >
                  <button
                    type="button"
                    onClick={() => setScope("all")}
                    className={`rounded-lg py-2 transition-all cursor-pointer ${
                      scope === "all"
                        ? "bg-surface text-ink shadow-2xs font-bold"
                        : "text-mute hover:text-ink"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope("lost")}
                    className={`rounded-lg py-2 transition-all cursor-pointer ${
                      scope === "lost"
                        ? "bg-surface text-ink shadow-2xs font-bold"
                        : "text-mute hover:text-ink"
                    }`}
                  >
                    Lost
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope("found")}
                    className={`rounded-lg py-2 transition-all cursor-pointer ${
                      scope === "found"
                        ? "bg-surface text-ink shadow-2xs font-bold"
                        : "text-mute hover:text-ink"
                    }`}
                  >
                    Found
                  </button>
                </div>

                {/* Search Input */}
                <div className="mt-4 flex min-h-[50px] items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 transition-colors focus-within:border-brick focus-within:ring-2 focus-within:ring-brick/20">
                  <Search size={18} className="shrink-0 text-mute" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search by name, category, or location..."
                    aria-label="Search lost and found items"
                    className="h-10 w-full min-w-0 flex-1 border-0 bg-transparent text-[15px] text-ink placeholder:text-mute/70 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-ink-hover"
                  >
                    Search
                  </button>
                </div>

                {/* Popular Categories */}
                <div className="mt-5">
                  <p className="text-xs font-semibold text-mute">
                    Popular campus categories:
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {POPULAR_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategoryClick(cat)}
                        className="rounded-full bg-paper px-3.5 py-1 text-xs font-medium text-ink transition-colors hover:bg-line/60 cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECENTLY REPORTED ON CAMPUS — White curved card section from image */}
      <section
        className="rounded-t-[2.5rem] border-t border-line/60 bg-surface px-4 py-12 sm:px-8 sm:py-16 shadow-xs"
        aria-labelledby="recent-listings"
      >
        <div className={containerClass}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brick">
                LIVE CAMPUS LISTINGS
              </p>
              <h2
                id="recent-listings"
                className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl mt-1.5"
              >
                Recently reported on campus
              </h2>
              <p className="mt-2 text-sm leading-6 text-mute">
                Real-time records from students and staff across GCOEC departments and facilities.
              </p>
            </div>

            {/* Scope Toggle for recent items */}
            <div className="flex shrink-0 items-center rounded-lg border border-line bg-paper p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRecentTab("all")}
                className={`rounded-md px-3 py-1.5 transition-all cursor-pointer ${
                  recentTab === "all"
                    ? "bg-surface text-ink shadow-2xs font-bold"
                    : "text-mute hover:text-ink"
                }`}
              >
                All Recent
              </button>
              <button
                type="button"
                onClick={() => setRecentTab("lost")}
                className={`rounded-md px-3 py-1.5 transition-all cursor-pointer ${
                  recentTab === "lost"
                    ? "bg-surface text-brick shadow-2xs font-bold"
                    : "text-mute hover:text-ink"
                }`}
              >
                Lost Items
              </button>
              <button
                type="button"
                onClick={() => setRecentTab("found")}
                className={`rounded-md px-3 py-1.5 transition-all cursor-pointer ${
                  recentTab === "found"
                    ? "bg-surface text-canopy shadow-2xs font-bold"
                    : "text-mute hover:text-ink"
                }`}
              >
                Found Items
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="mt-8">
            {lostLoading || foundLoading ? (
              <div className="py-12 text-center text-sm font-semibold text-mute">
                Loading campus listings…
              </div>
            ) : recentItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line p-10 text-center">
                <p className="text-sm font-semibold text-mute">No records found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recentItems.map((item) => (
                  <ItemCard
                    key={`${item.itemType}-${item.id}`}
                    type={item.itemType}
                    item={item}
                    onUpdate={item.itemType === "lost" ? updateLostItem : updateFoundItem}
                    onDelete={item.itemType === "lost" ? deleteLostItem : deleteFoundItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CCTV Surveillance & IP Webcam Spotlight Card */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-paper/60 p-6 shadow-xs">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700">
                  <Camera size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-ink">
                      Campus CCTV &amp; IP Webcam Inspector
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-mute">
                    Inspect real-time campus video feeds, connect an Android IP Webcam, and spot lost belongings in study halls and dining areas.
                  </p>
                </div>
              </div>
              <Link
                to="/cctv"
                className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ink-hover"
              >
                <span>Launch CCTV Tab</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAKE A REPORT — Twin panels */}
      <section className="bg-paper py-12 lg:py-16" aria-labelledby="make-a-report">
        <div className={containerClass}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-widest text-brick">
                Make a report
              </p>
              <h2
                id="make-a-report"
                className="font-serif text-2xl font-bold text-ink sm:text-3xl mt-1.5"
              >
                Two reports, one registry
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-mute">
                Lost something? Found something? Detailed reports help students and staff quickly verify and recover misplaced belongings.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface sm:grid sm:grid-cols-2">
                <div className="flex flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lost text-white">
                      <LostIcon size={20} />
                    </span>
                    <h3 className="font-serif text-lg font-bold text-ink">
                      You lost something
                    </h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-mute">
                    Report what you lost with location and identifying details so the campus community can help locate it.
                  </p>
                  <div className="mt-6">
                    <Button to="/report-lost" variant="secondary" className="w-full gap-2">
                      Report Lost Item
                      <ArrowRightIcon size={16} className="text-lost" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col border-t border-line p-6 sm:border-l sm:border-t-0 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-found text-white">
                      <FoundIcon size={20} />
                    </span>
                    <h3 className="font-serif text-lg font-bold text-ink">
                      You found something
                    </h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-mute">
                    Report what you turned in so its rightful owner has the opportunity to claim and recover it safely.
                  </p>
                  <div className="mt-6">
                    <Button to="/report-found" variant="secondary" className="w-full gap-2">
                      Report Found Item
                      <ArrowRightIcon size={16} className="text-found" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECOVERY WORKFLOW */}
      <section className="border-t border-line/60 bg-surface py-12 lg:py-16" aria-labelledby="recovery-process">
        <div className={containerClass}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-canopy">
                Recovery Workflow
              </p>
              <h2
                id="recovery-process"
                className="font-serif text-2xl font-bold text-ink sm:text-3xl mt-1.5"
              >
                How an item gets back to you
              </h2>
            </div>
            <p className="flex max-w-md items-start gap-2 text-sm leading-6 text-mute">
              <ShieldIcon size={16} className="mt-1 shrink-0 text-pending" aria-hidden="true" />
              Ownership is verified through student ID and details before handover.
            </p>
          </div>

          <ol className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {RECOVERY_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <li key={step.title} className="flex min-w-0 flex-col bg-surface p-5 md:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-canopy/10 text-canopy">
                      <StepIcon size={18} />
                    </span>
                    <span className="text-xs font-bold text-mute">Step {index + 1}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-ink mt-3">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-mute">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}

export default Home;