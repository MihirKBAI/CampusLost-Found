import { detectItemType, ITEM_AVATAR_META } from "../utils/itemAvatars";

export function ItemVectorGraphic({ type, className = "h-full w-full" }) {
  switch (type) {
    case "wallet":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Shadow */}
          <rect x="24" y="28" width="112" height="72" rx="10" fill="#000000" fillOpacity="0.08" />
          {/* Main Leather Body */}
          <rect x="20" y="24" width="116" height="72" rx="8" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          {/* Stitching lines */}
          <rect x="24" y="28" width="108" height="64" rx="6" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Inside Fold & flap */}
          <path d="M20 60 H136" stroke="#451A03" strokeWidth="2" />
          {/* Top Card Pocket */}
          <path d="M24 44 C50 48 80 48 106 44" stroke="#92400E" strokeWidth="2" fill="none" />
          <path d="M30 40 H80" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          {/* Lower Card Pocket */}
          <path d="M24 54 C50 58 80 58 106 54" stroke="#92400E" strokeWidth="2" fill="none" />
          <path d="M36 50 H90" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          {/* Metallic Clasp / Badge */}
          <rect x="114" y="52" width="22" height="16" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
          <circle cx="125" cy="60" r="3" fill="#FEF3C7" />
        </svg>
      );

    case "calculator":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer casing */}
          <rect x="42" y="12" width="76" height="96" rx="9" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
          {/* Solar cell */}
          <rect x="78" y="18" width="32" height="8" rx="2" fill="#78350F" stroke="#92400E" strokeWidth="1" />
          <line x1="88" y1="18" x2="88" y2="26" stroke="#451A03" strokeWidth="1" />
          <line x1="98" y1="18" x2="98" y2="26" stroke="#451A03" strokeWidth="1" />
          {/* LCD Screen */}
          <rect x="50" y="30" width="60" height="22" rx="3" fill="#A7F3D0" stroke="#047857" strokeWidth="1.5" />
          <text x="54" y="42" fill="#065F46" fontSize="7" fontFamily="monospace" fontWeight="bold">
            sin(θ)+√x
          </text>
          <text x="96" y="49" fill="#064E3B" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">
            137.036
          </text>
          {/* Function Buttons Row */}
          <rect x="50" y="58" width="10" height="6" rx="1.5" fill="#475569" />
          <rect x="63" y="58" width="10" height="6" rx="1.5" fill="#475569" />
          <rect x="75" y="58" width="10" height="6" rx="1.5" fill="#475569" />
          <rect x="87" y="58" width="10" height="6" rx="1.5" fill="#0284C7" />
          <rect x="99" y="58" width="11" height="6" rx="1.5" fill="#EA580C" />
          {/* Keypad Grid */}
          <rect x="50" y="68" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="63" y="68" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="76" y="68" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="89" y="68" width="10" height="7" rx="1.5" fill="#475569" />
          <rect x="100" y="68" width="10" height="7" rx="1.5" fill="#475569" />

          <rect x="50" y="79" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="63" y="79" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="76" y="79" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="89" y="79" width="10" height="7" rx="1.5" fill="#475569" />
          <rect x="100" y="79" width="10" height="7" rx="1.5" fill="#475569" />

          <rect x="50" y="90" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="63" y="90" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="76" y="90" width="10" height="7" rx="1.5" fill="#334155" />
          <rect x="89" y="90" width="21" height="7" rx="1.5" fill="#3B82F6" />
        </svg>
      );

    case "backpack":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Top Handle */}
          <path d="M68 22 C68 14 92 14 92 22" stroke="#1E3A8A" strokeWidth="3.5" strokeLinecap="round" />
          {/* Main Body */}
          <path
            d="M48 38 C48 24 64 20 80 20 C96 20 112 24 112 38 V96 C112 102 106 106 98 106 H62 C54 106 48 102 48 96 Z"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="2.5"
          />
          {/* Upper Zipper Arc */}
          <path d="M54 44 C68 36 92 36 106 44" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3 2" />
          {/* Front Pocket */}
          <rect x="56" y="62" width="48" height="36" rx="6" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="2" />
          {/* Front Zipper */}
          <line x1="62" y1="70" x2="98" y2="70" stroke="#DBEAFE" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Brand/Accent Tag */}
          <rect x="74" y="80" width="12" height="6" rx="1.5" fill="#F59E0B" />
          {/* Side Bottle Mesh */}
          <path d="M48 68 C44 72 44 86 48 90" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          <path d="M112 68 C116 72 116 86 112 90" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "bottle":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Cap Handle */}
          <rect x="73" y="14" width="14" height="10" rx="3" fill="#047857" stroke="#065F46" strokeWidth="1.5" />
          {/* Screw Cap */}
          <rect x="68" y="24" width="24" height="12" rx="2" fill="#065F46" stroke="#047857" strokeWidth="2" />
          <line x1="72" y1="28" x2="88" y2="28" stroke="#6EE7B7" strokeWidth="1.5" />
          {/* Flask Neck */}
          <rect x="72" y="36" width="16" height="6" fill="#0D9488" stroke="#0F766E" strokeWidth="1.5" />
          {/* Bottle Body */}
          <rect x="60" y="42" width="40" height="66" rx="8" fill="#0F766E" stroke="#115E59" strokeWidth="2.5" />
          {/* Thermal Silicone Grip Bands */}
          <rect x="61" y="56" width="38" height="18" fill="#14B8A6" opacity="0.3" />
          <line x1="64" y1="62" x2="96" y2="62" stroke="#99F6E4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="68" x2="96" y2="68" stroke="#99F6E4" strokeWidth="1.5" strokeLinecap="round" />
          {/* Bottle Highlight */}
          <path d="M66 48 V100" stroke="#CCFBF1" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </svg>
      );

    case "usb":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Metallic USB Plug */}
          <rect x="36" y="46" width="30" height="28" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
          {/* Contact Windows */}
          <rect x="42" y="52" width="8" height="6" fill="#334155" />
          <rect x="42" y="62" width="8" height="6" fill="#334155" />
          {/* Gold Contacts */}
          <line x1="56" y1="52" x2="62" y2="52" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="56" y1="57" x2="62" y2="57" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="56" y1="63" x2="62" y2="63" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="56" y1="68" x2="62" y2="68" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Main Flash Drive Casing */}
          <rect x="64" y="40" width="62" height="40" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
          {/* Accent Grip Stripe */}
          <line x1="82" y1="46" x2="82" y2="74" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          {/* Activity LED */}
          <circle cx="104" cy="60" r="2.5" fill="#38BDF8" />
          {/* Lanyard Hole */}
          <rect x="118" y="52" width="6" height="16" rx="3" fill="#475569" stroke="#334155" strokeWidth="1" />
        </svg>
      );

    case "drawing_kit":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Case / Board */}
          <rect x="32" y="20" width="96" height="80" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          {/* 45-degree Set Square */}
          <polygon points="44,88 90,88 44,42" fill="#BAE6FD" fillOpacity="0.7" stroke="#0284C7" strokeWidth="2" />
          <polygon points="50,82 76,82 50,56" fill="#FEF3C7" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="46" y1="88" x2="88" y2="88" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" />
          {/* Drafting Compass */}
          <circle cx="98" cy="36" r="4" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
          {/* Compass Legs */}
          <line x1="98" y1="38" x2="84" y2="84" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="98" y1="38" x2="114" y2="84" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="89" y1="58" x2="108" y2="58" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Lead & Needle tips */}
          <circle cx="84" cy="85" r="1.5" fill="#0F172A" />
          <circle cx="114" cy="85" r="1.5" fill="#CBD5E1" />
          {/* Pencil */}
          <rect x="116" y="28" width="6" height="54" rx="1" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
          <polygon points="116,82 122,82 119,89" fill="#FDE68A" />
          <polygon points="118,87 120,87 119,89" fill="#0F172A" />
        </svg>
      );

    case "earbuds":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Open Charging Case Base */}
          <rect x="52" y="44" width="56" height="56" rx="16" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          {/* Left Earbud Slot */}
          <rect x="62" y="32" width="14" height="26" rx="7" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="69" cy="38" r="4.5" fill="#0EA5E9" />
          <line x1="69" y1="46" x2="69" y2="54" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          {/* Right Earbud Slot */}
          <rect x="84" y="32" width="14" height="26" rx="7" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="91" cy="38" r="4.5" fill="#0EA5E9" />
          <line x1="91" y1="46" x2="91" y2="54" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          {/* Battery Status LED */}
          <circle cx="80" cy="72" r="2.5" fill="#10B981" />
          {/* Lightning / USB-C Port Base */}
          <rect x="74" y="98" width="12" height="2.5" rx="1" fill="#64748B" />
        </svg>
      );

    case "id_card":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Lanyard Clip */}
          <rect x="74" y="8" width="12" height="10" rx="2" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
          <circle cx="80" cy="13" r="2.5" fill="#CBD5E1" />
          <path d="M80 18 V26" stroke="#475569" strokeWidth="3" />
          {/* ID Card Base */}
          <rect x="44" y="24" width="72" height="84" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          {/* Header Banner */}
          <rect x="44" y="24" width="72" height="18" rx="6" fill="#BE123C" />
          <rect x="44" y="36" width="72" height="6" fill="#BE123C" />
          <text x="80" y="36" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
            CAMPUS PASS
          </text>
          {/* Student Photo Silhouette */}
          <rect x="52" y="48" width="22" height="26" rx="3" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="63" cy="56" r="4.5" fill="#94A3B8" />
          <path d="M55 71 C55 64 71 64 71 71" fill="#94A3B8" />
          {/* Student Details Lines */}
          <line x1="80" y1="52" x2="108" y2="52" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="60" x2="104" y2="60" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="68" x2="100" y2="68" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
          {/* Barcode / Magnetic Stripe */}
          <line x1="52" y1="84" x2="108" y2="84" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="52" y="88" width="56" height="10" fill="#0F172A" rx="1" />
          <line x1="56" y1="88" x2="56" y2="98" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="61" y1="88" x2="61" y2="98" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="68" y1="88" x2="68" y2="98" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="74" y1="88" x2="74" y2="98" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="82" y1="88" x2="82" y2="98" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="88" y1="88" x2="88" y2="98" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="96" y1="88" x2="96" y2="98" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="102" y1="88" x2="102" y2="98" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      );

    case "notebook":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Book Cover */}
          <rect x="46" y="16" width="76" height="90" rx="5" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          {/* Inner Pages Stack */}
          <rect x="52" y="20" width="68" height="82" rx="3" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
          {/* Cover Accent Plaque */}
          <rect x="64" y="34" width="44" height="22" rx="3" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
          <line x1="70" y1="42" x2="102" y2="42" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="74" y1="48" x2="98" y2="48" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
          {/* Lined Grid page lines */}
          <line x1="64" y1="68" x2="110" y2="68" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="76" x2="110" y2="76" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="84" x2="100" y2="84" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          {/* Spiral Bindings */}
          {[24, 34, 44, 54, 64, 74, 84, 94].map((y) => (
            <ellipse key={y} cx="46" cy={y} rx="4" ry="2.5" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
          ))}
          {/* Bookmark Ribbon */}
          <path d="M100 16 V52 L106 46 L112 52 V16" fill="#DC2626" />
        </svg>
      );

    case "keys":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Keyring Loop */}
          <circle cx="60" cy="46" r="20" stroke="#94A3B8" strokeWidth="4.5" />
          <circle cx="60" cy="46" r="15" stroke="#CBD5E1" strokeWidth="2" />
          {/* Round ID Tag */}
          <circle cx="42" cy="72" r="14" fill="#059669" stroke="#047857" strokeWidth="2" />
          <circle cx="42" cy="62" r="2.5" fill="#A7F3D0" />
          <text x="42" y="75" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">
            GCOEC
          </text>
          {/* Silver Tumbler Key */}
          <g transform="rotate(40 60 46)">
            <circle cx="86" cy="46" r="9" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
            <circle cx="86" cy="46" r="3.5" fill="#F8FAFC" />
            <rect x="94" y="43" width="36" height="6" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
            <rect x="114" y="49" width="3" height="4" fill="#64748B" />
            <rect x="122" y="49" width="3" height="6" fill="#64748B" />
            <rect x="127" y="49" width="3" height="3" fill="#64748B" />
          </g>
          {/* Brass Key */}
          <g transform="rotate(15 60 46)">
            <circle cx="86" cy="46" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            <circle cx="86" cy="46" r="3" fill="#FEF08A" />
            <rect x="94" y="44" width="32" height="4.5" rx="1" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
            <rect x="112" y="48.5" width="3" height="4" fill="#CA8A04" />
            <rect x="118" y="48.5" width="3" height="5" fill="#CA8A04" />
          </g>
        </svg>
      );

    case "phone":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Phone Frame */}
          <rect x="52" y="14" width="56" height="92" rx="12" fill="#18181B" stroke="#27272A" strokeWidth="3" />
          {/* Display Glass */}
          <rect x="56" y="18" width="48" height="84" rx="8" fill="#6366F1" />
          {/* Dynamic Island / Notch */}
          <rect x="72" y="22" width="16" height="5" rx="2.5" fill="#09090B" />
          {/* Lock Screen Clock */}
          <text x="80" y="46" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            10:24
          </text>
          <text x="80" y="55" fill="#C7D2FE" fontSize="5.5" textAnchor="middle">
            Wednesday, Oct 21
          </text>
          {/* Notification Card */}
          <rect x="60" y="64" width="40" height="14" rx="3" fill="#FFFFFF" fillOpacity="0.2" />
          <line x1="64" y1="70" x2="88" y2="70" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="64" y1="74" x2="80" y2="74" stroke="#E0E7FF" strokeWidth="1.2" strokeLinecap="round" />
          {/* Home Bar */}
          <rect x="70" y="96" width="20" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      );

    case "laptop":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Screen Lid */}
          <rect x="36" y="20" width="88" height="58" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
          {/* Glowing Screen */}
          <rect x="42" y="26" width="76" height="46" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />
          {/* Screen Content Terminal */}
          <circle cx="48" cy="31" r="1.5" fill="#EF4444" />
          <circle cx="53" cy="31" r="1.5" fill="#EAB308" />
          <circle cx="58" cy="31" r="1.5" fill="#10B981" />
          <line x1="48" y1="38" x2="80" y2="38" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="48" y1="44" x2="98" y2="44" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="48" y1="50" x2="72" y2="50" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
          {/* Base / Keyboard Deck */}
          <polygon points="24,84 136,84 128,94 32,94" fill="#334155" stroke="#1E293B" strokeWidth="2" />
          {/* Trackpad */}
          <rect x="68" y="86" width="24" height="6" rx="1" fill="#475569" />
        </svg>
      );

    case "watch":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Upper Strap */}
          <rect x="71" y="12" width="18" height="26" rx="3" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
          {/* Lower Strap */}
          <rect x="71" y="82" width="18" height="26" rx="3" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
          {/* Strap Holes */}
          <circle cx="80" cy="92" r="1.5" fill="#64748B" />
          <circle cx="80" cy="99" r="1.5" fill="#64748B" />
          {/* Watch Case */}
          <circle cx="80" cy="60" r="28" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
          <circle cx="80" cy="60" r="24" fill="#0284C7" />
          {/* Bezel markers */}
          <line x1="80" y1="39" x2="80" y2="43" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="77" x2="80" y2="81" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="59" y1="60" x2="63" y2="60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="97" y1="60" x2="101" y2="60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Hands */}
          <line x1="80" y1="60" x2="80" y2="48" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="60" x2="94" y2="60" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="60" r="3" fill="#FFFFFF" />
          {/* Crown Button */}
          <rect x="108" y="56" width="3.5" height="8" rx="1.5" fill="#475569" stroke="#1E293B" strokeWidth="1" />
        </svg>
      );

    case "glasses":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Left Lens Frame */}
          <rect x="32" y="42" width="40" height="36" rx="10" fill="#BAE6FD" fillOpacity="0.4" stroke="#0369A1" strokeWidth="3" />
          {/* Right Lens Frame */}
          <rect x="88" y="42" width="40" height="36" rx="10" fill="#BAE6FD" fillOpacity="0.4" stroke="#0369A1" strokeWidth="3" />
          {/* Bridge */}
          <path d="M72 52 C76 48 84 48 88 52" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Left Temple Bar */}
          <path d="M32 48 H20 C18 48 16 52 16 56" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Right Temple Bar */}
          <path d="M128 48 H140 C142 48 144 52 144 56" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Glare Reflex */}
          <line x1="40" y1="48" x2="52" y2="68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="96" y1="48" x2="108" y2="68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case "umbrella":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Ferrule / Top Spike */}
          <line x1="80" y1="16" x2="80" y2="24" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Umbrella Canopy */}
          <path
            d="M30 64 C30 36 52 24 80 24 C108 24 130 36 130 64 C120 60 110 60 100 64 C90 60 80 60 70 64 C60 60 50 60 40 64 Z"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="2.5"
          />
          {/* Rib Lines */}
          <path d="M80 24 Q65 44 60 64" stroke="#93C5FD" strokeWidth="1.5" fill="none" />
          <path d="M80 24 Q95 44 100 64" stroke="#93C5FD" strokeWidth="1.5" fill="none" />
          {/* Shaft */}
          <line x1="80" y1="64" x2="80" y2="98" stroke="#475569" strokeWidth="3" />
          {/* Curved Handle */}
          <path d="M80 98 C80 106 92 106 92 98" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "jacket":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Collar / Hood */}
          <path d="M60 22 C70 30 90 30 100 22" stroke="#9A3412" strokeWidth="3" fill="none" />
          {/* Main Jacket Torso & Sleeves */}
          <path
            d="M60 22 L34 44 L44 64 L54 54 V102 H106 V54 L116 64 L126 44 L100 22 Z"
            fill="#EA580C"
            stroke="#C2410C"
            strokeWidth="2.5"
          />
          {/* Center Zipper */}
          <line x1="80" y1="28" x2="80" y2="102" stroke="#FED7AA" strokeWidth="2.5" strokeDasharray="3 2" />
          {/* Kangaroo / Side Pockets */}
          <path d="M62 82 H74 V96 H62 Z" fill="#C2410C" />
          <path d="M86 82 H98 V96 H86 Z" fill="#C2410C" />
          {/* Pull strings */}
          <line x1="68" y1="28" x2="68" y2="42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="92" y1="28" x2="92" y2="42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "charger":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Power Brick Body */}
          <rect x="42" y="32" width="46" height="52" rx="8" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
          {/* AC Wall Prongs */}
          <rect x="30" y="44" width="12" height="6" rx="1.5" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          <rect x="30" y="62" width="12" height="6" rx="1.5" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          {/* Output USB-C Port */}
          <rect x="80" y="52" width="8" height="12" rx="3" fill="#0F172A" />
          {/* Coiled Cable */}
          <path
            d="M88 58 C104 58 108 38 122 46 C136 54 106 82 124 88 H134"
            stroke="#475569"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cable Tip */}
          <rect x="134" y="85" width="12" height="6" rx="2" fill="#0F172A" />
          <rect x="146" y="86.5" width="4" height="3" fill="#CBD5E1" />
        </svg>
      );

    case "electronics":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Circuit / Gadget base */}
          <rect x="36" y="24" width="88" height="72" rx="10" fill="#1E1B4B" stroke="#4338CA" strokeWidth="2.5" />
          {/* Silicon Core Chip */}
          <rect x="64" y="44" width="32" height="32" rx="4" fill="#312E81" stroke="#6366F1" strokeWidth="2" />
          <circle cx="80" cy="60" r="6" fill="#818CF8" />
          {/* Bus Traces */}
          <line x1="48" y1="44" x2="64" y2="44" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="60" x2="64" y2="60" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="76" x2="64" y2="76" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
          <line x1="96" y1="44" x2="112" y2="44" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
          <line x1="96" y1="60" x2="112" y2="60" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
          <line x1="96" y1="76" x2="112" y2="76" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "accessories":
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Pouch / Bag Accessory */}
          <rect x="40" y="32" width="80" height="64" rx="12" fill="#57534E" stroke="#292524" strokeWidth="2.5" />
          <path d="M40 50 C60 62 100 62 120 50" stroke="#A8A29E" strokeWidth="2" fill="none" />
          <circle cx="80" cy="66" r="5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
          {/* Strap loop */}
          <path d="M56 32 C56 18 104 18 104 32" stroke="#78716C" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    default: // "other"
      return (
        <svg
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Campus Lost & Found Parcel */}
          <rect x="36" y="28" width="88" height="68" rx="8" fill="#E2E8F0" stroke="#64748B" strokeWidth="2.5" />
          {/* Tape bands */}
          <rect x="74" y="28" width="12" height="68" fill="#FDE68A" fillOpacity="0.8" stroke="#D97706" strokeWidth="1" />
          <rect x="36" y="56" width="88" height="12" fill="#FDE68A" fillOpacity="0.8" stroke="#D97706" strokeWidth="1" />
          {/* Security Tag Seal */}
          <circle cx="80" cy="62" r="9" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          <path d="M76 62 L79 65 L84 59" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function ItemVectorAvatar({
  item,
  type = "lost",
  className = "",
  showBadge = true,
  compact = false,
}) {
  const itemType = detectItemType(item);
  const meta = ITEM_AVATAR_META[itemType] || ITEM_AVATAR_META.other;
  const isFound = type === "found";

  return (
    <div
      role="img"
      aria-label={`${item?.itemName || "Item"} vector avatar illustration`}
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${meta.bgClass} ${className}`}
    >
      {/* Background radial accent shimmer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${meta.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Illustration Graphic */}
      <div className={`relative flex items-center justify-center transition-transform duration-300 ${compact ? "h-20 w-28 scale-95" : "h-36 w-48 sm:h-44 sm:w-56"}`}>
        <ItemVectorGraphic type={itemType} />
      </div>

      {/* Pill Badge labeling the vector representation */}
      {showBadge && (
        <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 px-1">
          <span className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-surface/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-ink/80 shadow-xs backdrop-blur-xs">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: meta.accentColor }}
              aria-hidden="true"
            />
            {meta.title}
          </span>
          <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-mute dark:bg-white/10">
            Vector Avatar
          </span>
        </div>
      )}
    </div>
  );
}

export default ItemVectorAvatar;
