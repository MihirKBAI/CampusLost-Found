import { useContext, useMemo, useState } from "react";
import { LostItemContext } from "../context/LostItemContext";
import { AuthContext } from "../context/AuthContext";
import FilterBar from "../components/FilterBar";
import ItemCard from "../components/ItemCard";
import PageShell from "../components/PageShell";
import { getItemTimestamp } from "../utils/items";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import LoadingState from "../components/LoadingState";
import Reveal from "../components/Reveal";

function LostItemsPage() {
  const { lostItems, deleteLostItem, updateLostItem, isLoading, loadError } =
    useContext(LostItemContext);
  const { canViewRevealedImages } = useContext(AuthContext);
  const [autoRevealPhotos, setAutoRevealPhotos] = useState(false);

  const [search, setSearch] = useState(() => {
    const saved = sessionStorage.getItem("campusfind:lost:search");
    if (saved) {
      sessionStorage.removeItem("campusfind:lost:search");
      return saved;
    }
    return "";
  });
  const [category, setCategory] = useState(() => {
    const saved = sessionStorage.getItem("campusfind:lost:category");
    if (saved) {
      sessionStorage.removeItem("campusfind:lost:category");
      return saved;
    }
    return "All";
  });
  const [sort, setSort] = useState("newest");

  const filteredItems = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const next = lostItems.filter((item) => {
      const matchesSearch =
        !needle ||
        [item.itemName, item.category, item.location]
          .map((field) => (field || "").toLowerCase())
          .some((field) => field.includes(needle));

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });

    next.sort((a, b) => {
      const diff = getItemTimestamp(a, "lost") - getItemTimestamp(b, "lost");
      return sort === "oldest" ? diff : -diff;
    });

    return next;
  }, [lostItems, search, category, sort]);

  const hasFilters = search.trim() !== "" || category !== "All";
  const showing = filteredItems.length;
  const total = lostItems.length;
  const statusText = hasFilters
    ? `Showing ${showing} of ${total} lost ${total === 1 ? "item" : "items"}`
    : `${total} lost ${total === 1 ? "item" : "items"} registered`;

  return (
    <PageShell
      title="Lost Items Registry"
      badgeText="GCOEC Campus"
      description="Belongings reported misplaced or missing across college facilities. Search by name, category, or location."
      tone="lost"
      action={
        <Button to="/report-lost" variant="lost" className="w-full sm:w-auto">
          Report Lost Item
        </Button>
      }
    >
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        searchLabel="Search lost items"
        searchPlaceholder="Search by title, department, or category..."
      />

      {loadError && (
        <div
          className="mb-6 rounded-card border border-lost/30 bg-lost-tint p-4 text-xs font-medium text-lost"
          role="alert"
        >
          <p className="font-semibold text-sm">Lost items unavailable</p>
          <p className="mt-1">{loadError}</p>
        </div>
      )}

      {isLoading ? (
        <LoadingState label="Loading lost items registry…" />
      ) : showing === 0 ? (
        total === 0 ? (
          <EmptyState
            title="No lost items currently reported"
            description="When a missing belonging is logged by a student or staff member, it appears here immediately."
            actionLabel="Report Lost Item"
            actionTo="/report-lost"
            variant="lost"
          />
        ) : (
          <EmptyState
            title="No items matched your query"
            description="Try adjusting your keywords or category filter, or file a new lost item report."
            actionLabel="Report Lost Item"
            actionTo="/report-lost"
            variant="lost"
          />
        )
      ) : (
        <div className="min-w-0">
          <h2 className="sr-only">Lost item listings</h2>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3.5">
            <p className="text-sm font-medium text-ink/80" role="status">
              {statusText}
            </p>
            {canViewRevealedImages ? (
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-canopy/30 bg-canopy/5 px-3 py-1 text-xs font-semibold text-canopy transition-colors hover:bg-canopy/10">
                <input
                  type="checkbox"
                  checked={autoRevealPhotos}
                  onChange={(e) => setAutoRevealPhotos(e.target.checked)}
                  className="rounded border-canopy/50 text-canopy focus:ring-canopy cursor-pointer"
                />
                <span>Auto-reveal original photos</span>
              </label>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-mute" title="Generic vector avatars shown. Only admin and approved uploaders can view original photos.">
                <span className="h-1.5 w-1.5 rounded-full bg-canopy/60" aria-hidden="true" />
                Generic vector avatars active (Privacy protected)
              </span>
            )}
          </div>
          <ul className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <Reveal as="li" key={item.id} delay={Math.min(index, 5) * 50} className="min-w-0">
                <ItemCard
                  type="lost"
                  item={item}
                  onUpdate={updateLostItem}
                  onDelete={deleteLostItem}
                  forceRevealDefault={autoRevealPhotos}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </PageShell>
  );
}

export default LostItemsPage;
