// Utility to detect the item type and return rich vector avatar metadata.

export function detectItemType(item) {
  if (!item) return "other";

  const name = String(item.itemName || item.name || "").toLowerCase();
  const desc = String(item.description || "").toLowerCase();
  const cat = String(item.category || "").toLowerCase();
  const combined = `${name} ${desc} ${cat}`;

  // 1. Wallets and purses
  if (
    combined.includes("wallet") ||
    combined.includes("purse") ||
    combined.includes("billfold") ||
    combined.includes("cardholder") ||
    combined.includes("card holder") ||
    combined.includes("clutch")
  ) {
    return "wallet";
  }

  // 2. Calculators
  if (
    combined.includes("calculator") ||
    combined.includes("casio") ||
    combined.includes("scientific calc") ||
    combined.includes("fx-") ||
    combined.includes("ti-8")
  ) {
    return "calculator";
  }

  // 3. Backpacks and bags
  if (
    combined.includes("backpack") ||
    combined.includes("back pack") ||
    combined.includes("rucksack") ||
    combined.includes("satchel") ||
    combined.includes("bookbag") ||
    combined.includes("tote") ||
    combined.includes("duffel") ||
    (combined.includes("bag") && !combined.includes("water bottle"))
  ) {
    return "backpack";
  }

  // 4. Bottles and drinkware
  if (
    combined.includes("bottle") ||
    combined.includes("flask") ||
    combined.includes("tumbler") ||
    combined.includes("thermos") ||
    combined.includes("sipper") ||
    combined.includes("shaker") ||
    combined.includes("water")
  ) {
    return "bottle";
  }

  // 5. USB drives / storage
  if (
    combined.includes("usb") ||
    combined.includes("flash drive") ||
    combined.includes("pen drive") ||
    combined.includes("pendrive") ||
    combined.includes("thumb drive") ||
    combined.includes("memory stick")
  ) {
    return "usb";
  }

  // 6. Drawing / drafting kits
  if (
    combined.includes("drawing kit") ||
    combined.includes("drafting") ||
    combined.includes("drafter") ||
    combined.includes("compass") ||
    combined.includes("divider") ||
    combined.includes("set square") ||
    combined.includes("engineering drawing") ||
    combined.includes("geometry box")
  ) {
    return "drawing_kit";
  }

  // 7. Earbuds and headphones
  if (
    combined.includes("earbud") ||
    combined.includes("earbuds") ||
    combined.includes("airpod") ||
    combined.includes("airpods") ||
    combined.includes("headphone") ||
    combined.includes("headphones") ||
    combined.includes("earphone") ||
    combined.includes("earphones") ||
    combined.includes("buds") ||
    combined.includes("tws")
  ) {
    return "earbuds";
  }

  // 8. ID cards and badges
  if (
    combined.includes("id card") ||
    combined.includes("student id") ||
    combined.includes("identity card") ||
    combined.includes("smart card") ||
    combined.includes("badge") ||
    combined.includes("admit card") ||
    combined.includes("college card")
  ) {
    return "id_card";
  }

  // 9. Notebooks and books
  if (
    combined.includes("notebook") ||
    combined.includes("note book") ||
    combined.includes("spiral") ||
    combined.includes("register") ||
    combined.includes("diary") ||
    combined.includes("journal") ||
    combined.includes("textbook") ||
    combined.includes("book")
  ) {
    return "notebook";
  }

  // 10. Keys and keychains
  if (
    combined.includes("key") ||
    combined.includes("keys") ||
    combined.includes("keychain") ||
    combined.includes("key ring") ||
    combined.includes("keychain") ||
    combined.includes("key fob")
  ) {
    return "keys";
  }

  // 11. Phones and smartphones
  if (
    combined.includes("phone") ||
    combined.includes("smartphone") ||
    combined.includes("iphone") ||
    combined.includes("android") ||
    combined.includes("mobile") ||
    combined.includes("samsung") ||
    combined.includes("oneplus") ||
    combined.includes("pixel")
  ) {
    return "phone";
  }

  // 12. Laptops and computers
  if (
    combined.includes("laptop") ||
    combined.includes("macbook") ||
    combined.includes("notebook pc") ||
    combined.includes("dell") ||
    combined.includes("thinkpad") ||
    combined.includes("chromebook")
  ) {
    return "laptop";
  }

  // 13. Watches
  if (
    combined.includes("watch") ||
    combined.includes("smartwatch") ||
    combined.includes("wrist watch") ||
    combined.includes("timepiece")
  ) {
    return "watch";
  }

  // 14. Eyewear
  if (
    combined.includes("glasses") ||
    combined.includes("spectacles") ||
    combined.includes("sunglasses") ||
    combined.includes("specs") ||
    combined.includes("eyeglass")
  ) {
    return "glasses";
  }

  // 15. Umbrellas
  if (combined.includes("umbrella") || combined.includes("parasol")) {
    return "umbrella";
  }

  // 16. Apparel and jackets
  if (
    combined.includes("jacket") ||
    combined.includes("hoodie") ||
    combined.includes("sweater") ||
    combined.includes("coat") ||
    combined.includes("blazer") ||
    combined.includes("shirt")
  ) {
    return "jacket";
  }

  // 17. Chargers and cables
  if (
    combined.includes("charger") ||
    combined.includes("adapter") ||
    combined.includes("cable") ||
    combined.includes("power bank") ||
    combined.includes("powerbank")
  ) {
    return "charger";
  }

  // Category fallbacks
  switch (cat) {
    case "electronics":
      return "electronics";
    case "accessories":
      return "accessories";
    case "books":
      return "notebook";
    case "documents":
      return "id_card";
    case "keys":
      return "keys";
    default:
      return "other";
  }
}

export const ITEM_AVATAR_META = {
  wallet: {
    title: "Wallet & Cardholder",
    tag: "Accessories",
    bgClass: "from-amber-100/70 via-orange-50 to-stone-100",
    borderClass: "border-amber-200/80",
    accentColor: "#b45309",
    categoryLabel: "Accessories",
  },
  calculator: {
    title: "Scientific Calculator",
    tag: "Electronics",
    bgClass: "from-sky-100/70 via-slate-50 to-cyan-100/50",
    borderClass: "border-sky-200/80",
    accentColor: "#0284c7",
    categoryLabel: "Electronics",
  },
  backpack: {
    title: "College Backpack",
    tag: "Accessories",
    bgClass: "from-blue-100/70 via-indigo-50/60 to-slate-100",
    borderClass: "border-blue-200/80",
    accentColor: "#3b82f6",
    categoryLabel: "Accessories",
  },
  bottle: {
    title: "Reusable Bottle",
    tag: "Everyday Carry",
    bgClass: "from-emerald-100/70 via-teal-50 to-slate-100",
    borderClass: "border-emerald-200/80",
    accentColor: "#059669",
    categoryLabel: "Other",
  },
  usb: {
    title: "USB Flash Drive",
    tag: "Electronics",
    bgClass: "from-slate-200/70 via-zinc-50 to-stone-100",
    borderClass: "border-slate-300/80",
    accentColor: "#475569",
    categoryLabel: "Electronics",
  },
  drawing_kit: {
    title: "Drawing & Drafting Kit",
    tag: "Engineering Tool",
    bgClass: "from-amber-100/80 via-yellow-50 to-stone-100",
    borderClass: "border-amber-300/80",
    accentColor: "#d97706",
    categoryLabel: "Other",
  },
  earbuds: {
    title: "Wireless Earbuds Case",
    tag: "Electronics",
    bgClass: "from-cyan-100/70 via-sky-50 to-blue-50",
    borderClass: "border-cyan-200/80",
    accentColor: "#0891b2",
    categoryLabel: "Electronics",
  },
  id_card: {
    title: "College Student ID",
    tag: "Identity & Pass",
    bgClass: "from-rose-100/70 via-orange-50 to-stone-100",
    borderClass: "border-rose-200/80",
    accentColor: "#e11d48",
    categoryLabel: "Documents",
  },
  notebook: {
    title: "Course Notebook",
    tag: "Books & Study",
    bgClass: "from-amber-100/60 via-stone-50 to-yellow-50/50",
    borderClass: "border-amber-200/80",
    accentColor: "#92400e",
    categoryLabel: "Books",
  },
  keys: {
    title: "Keyring & Keys",
    tag: "Personal Keys",
    bgClass: "from-emerald-100/70 via-green-50 to-teal-50",
    borderClass: "border-emerald-200/80",
    accentColor: "#16a34a",
    categoryLabel: "Keys",
  },
  phone: {
    title: "Smartphone",
    tag: "Electronics",
    bgClass: "from-violet-100/70 via-purple-50 to-slate-100",
    borderClass: "border-violet-200/80",
    accentColor: "#7c3aed",
    categoryLabel: "Electronics",
  },
  laptop: {
    title: "Laptop Computer",
    tag: "Electronics",
    bgClass: "from-slate-200/70 via-zinc-100 to-sky-50",
    borderClass: "border-slate-300/80",
    accentColor: "#334155",
    categoryLabel: "Electronics",
  },
  watch: {
    title: "Watch / Smartwatch",
    tag: "Accessories",
    bgClass: "from-stone-200/60 via-amber-50/40 to-stone-100",
    borderClass: "border-stone-300/80",
    accentColor: "#57534e",
    categoryLabel: "Accessories",
  },
  glasses: {
    title: "Eyeglasses / Specs",
    tag: "Accessories",
    bgClass: "from-sky-100/60 via-blue-50 to-slate-100",
    borderClass: "border-sky-200/80",
    accentColor: "#0284c7",
    categoryLabel: "Accessories",
  },
  umbrella: {
    title: "Folding Umbrella",
    tag: "Accessories",
    bgClass: "from-blue-100/70 via-sky-50 to-indigo-50",
    borderClass: "border-blue-200/80",
    accentColor: "#2563eb",
    categoryLabel: "Accessories",
  },
  jacket: {
    title: "College Apparel",
    tag: "Clothing",
    bgClass: "from-orange-100/70 via-red-50 to-stone-100",
    borderClass: "border-orange-200/80",
    accentColor: "#ea580c",
    categoryLabel: "Accessories",
  },
  charger: {
    title: "Charger & Cable",
    tag: "Electronics",
    bgClass: "from-amber-100/60 via-yellow-50 to-slate-100",
    borderClass: "border-amber-200/80",
    accentColor: "#b45309",
    categoryLabel: "Electronics",
  },
  electronics: {
    title: "Electronic Device",
    tag: "Electronics",
    bgClass: "from-indigo-100/60 via-slate-50 to-sky-50",
    borderClass: "border-indigo-200/80",
    accentColor: "#4f46e5",
    categoryLabel: "Electronics",
  },
  accessories: {
    title: "Personal Belonging",
    tag: "Accessories",
    bgClass: "from-stone-200/60 via-amber-50 to-orange-50",
    borderClass: "border-stone-300/80",
    accentColor: "#78716c",
    categoryLabel: "Accessories",
  },
  other: {
    title: "Registered Belonging",
    tag: "Campus Item",
    bgClass: "from-stone-100 via-paper to-stone-50",
    borderClass: "border-stone-200",
    accentColor: "#64748b",
    categoryLabel: "Item",
  },
};
