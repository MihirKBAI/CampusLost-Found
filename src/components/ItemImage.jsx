import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ItemVectorAvatar from "./ItemVectorAvatar";

function ItemImage({
  type = "lost",
  item,
  imageData,
  alt = "",
  className = "",
  groupHover = false,
  compact = false,
  showDetailBanner = false,
  forceRevealDefault = false,
}) {
  const { user, canViewRevealedImages } = useContext(AuthContext);

  const effectiveImageData = imageData || item?.imageData;
  const hasOriginalImage = Boolean(effectiveImageData || item?.hasOriginalImage);

  const isOwner = Boolean(
    user && item?.userId && String(item.userId) === String(user.id)
  );
  const isAuthorized = Boolean(canViewRevealedImages || isOwner);

  // If forceRevealDefault is requested and viewer is authorized with an image, default to true.
  const [revealed, setRevealed] = useState(() => {
    return Boolean(forceRevealDefault && isAuthorized && effectiveImageData);
  });

  const displayName = item?.itemName || alt || "Item";

  // When revealed and authorized to view with image data available:
  if (isAuthorized && revealed && effectiveImageData) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-paper ${className}`}
      >
        <img
          src={effectiveImageData}
          alt={`Original revealed photo of ${displayName}`}
          loading="lazy"
          className={`h-full w-full object-cover object-center ${
            groupHover ? "img-hover-zoom" : ""
          }`}
        />

        {/* Revealed Status Pill & Toggle Button */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1.5 z-10">
          <span className="inline-flex items-center gap-1 rounded-full border border-canopy/30 bg-surface/95 px-2 py-0.5 text-[10px] font-semibold text-canopy shadow-xs backdrop-blur-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-canopy" aria-hidden="true" />
            Original Photo Revealed
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setRevealed(false);
            }}
            className="inline-flex items-center gap-1 rounded-full border border-line bg-surface/90 px-2 py-0.5 text-[10px] font-medium text-ink transition-colors hover:bg-surface hover:border-mute/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-focus shadow-xs"
            title="Switch to generic vector avatar"
          >
            <span>Vector</span>
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, render the Generic Vector Avatar of the actual item!
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <ItemVectorAvatar
        item={item || { itemName: alt }}
        type={type}
        compact={compact}
        className="h-full w-full"
      />

      {/* Overlay badges depending on authorization status */}
      {hasOriginalImage ? (
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1.5 z-10 pointer-events-auto">
          {isAuthorized ? (
            effectiveImageData ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setRevealed(true);
                }}
                className="inline-flex items-center gap-1 rounded-full border border-canopy/40 bg-surface/95 px-2.5 py-0.5 text-[10px] font-semibold text-canopy transition-[background-color,border-color,transform] duration-150 hover:bg-canopy/10 hover:border-canopy hover:scale-105 shadow-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-focus"
                title="Only admin & approved uploaders can reveal original image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Reveal Photo</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface/90 px-2 py-0.5 text-[10px] font-semibold text-mute shadow-xs backdrop-blur-xs">
                Photo on file
              </span>
            )
          ) : (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-line/80 bg-surface/95 px-2 py-0.5 text-[10px] font-medium text-mute shadow-xs backdrop-blur-xs"
              title="Original photo is protected. Visible only to campus admin & approved uploaders."
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-2.5 w-2.5 text-mute/80"
                aria-hidden="true"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Photo Protected</span>
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ItemImage;
