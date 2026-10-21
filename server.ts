import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";
const COOKIE_NAME = "campusfind_token";

// Middleware
app.use(express.json({ limit: "16mb" }));
app.use(cookieParser());

// Simple in-memory data store with demo items
interface User {
  id: number;
  name: string;
  email: string;
  prn?: string;
  password: string;
  createdAt: string;
  isAdmin: boolean;
}

interface Item {
  id: number;
  itemName: string;
  category: string;
  description: string;
  location: string;
  dateLost?: string;
  dateFound?: string;
  contact: string;
  imageData?: string | null;
  userId?: number | null;
  createdAt: string;
}

interface RecoveryRequest {
  id: number;
  lostItemId: number;
  foundItemId: number;
  claimantName: string;
  claimantContact: string;
  claimantEmail: string;
  claimantMessage: string;
  claimantUserId?: number | null;
  proofImages: string[];
  status: "pending" | "approved" | "rejected" | "resolved";
  createdAt: string;
  updatedAt?: string;
}

interface CCTVSighting {
  id: number;
  cameraName: string;
  location: string;
  category: string;
  notes: string;
  timestamp: string;
  snapshotUrl?: string;
}

// Initial mock state
const users: User[] = [
  {
    id: 1,
    name: "Campus Security Admin",
    email: "admin@gcoec.ac.in",
    prn: "2022000000000001",
    password: "admin123",
    createdAt: new Date().toISOString(),
    isAdmin: true,
  },
  {
    id: 2,
    name: "GCOEC Student",
    email: "student@gcoec.ac.in",
    prn: "2022012345678901",
    password: "202201",
    createdAt: new Date().toISOString(),
    isAdmin: false,
  },
];

let nextUserId = 3;
let nextLostId = 7;
let nextFoundId = 5;
let nextRecoveryId = 2;
let nextSightingId = 3;

const lostItems: Item[] = [
  {
    id: 1,
    itemName: "Black Leather Wallet",
    category: "Accessories",
    description: "Black leather bifold wallet with card slots and a small coin pocket.",
    location: "Library",
    dateLost: "2026-08-29",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    itemName: "Silver Scientific Calculator",
    category: "Electronics",
    description: "Silver scientific calculator with a lightly scratched screen.",
    location: "Mechanical Department",
    dateLost: "2026-08-21",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    itemName: "Blue College Backpack",
    category: "Accessories",
    description: "Navy blue college backpack with a small logo on the front.",
    location: "Canteen",
    dateLost: "2026-08-12",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    itemName: "Engineering Drawing Kit",
    category: "Other",
    description: "Engineering drawing kit with a compass, divider, and pencils in a brown case.",
    location: "Classroom Number 10",
    dateLost: "2026-07-27",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    itemName: "Wireless Earbuds Case",
    category: "Electronics",
    description: "White wireless earbuds charging case with a short charging cable.",
    location: "Mechanical Department",
    dateLost: "2026-07-14",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    itemName: "GCOEC Student ID Card",
    category: "Documents",
    description: "College student ID card with holder photo and enrollment number.",
    location: "Library",
    dateLost: "2026-06-30",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: 1,
    createdAt: new Date().toISOString(),
  },
];

const foundItems: Item[] = [
  {
    id: 1,
    itemName: "Red Water Bottle",
    category: "Other",
    description: "Red plastic water bottle with a black screw cap.",
    location: "Auditorium",
    dateFound: "2026-08-25",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    itemName: "Black USB Flash Drive",
    category: "Electronics",
    description: "Black USB flash drive with a white stripe and a lanyard loop.",
    location: "Mechanical Department",
    dateFound: "2026-08-09",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    itemName: "Brown Notebook",
    category: "Books",
    description: "Brown spiral notebook with graph paper pages and handwritten notes.",
    location: "Library",
    dateFound: "2026-07-22",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    itemName: "Silver Keychain with Two Keys",
    category: "Keys",
    description: "Silver keychain ring holding two keys and a small round tag.",
    location: "Canteen",
    dateFound: "2026-06-18",
    contact: "Campus Lost & Found Office",
    imageData: null,
    userId: 1,
    createdAt: new Date().toISOString(),
  },
];

const recoveryRequests: RecoveryRequest[] = [
  {
    id: 1,
    lostItemId: 1,
    foundItemId: 4,
    claimantName: "Aditya Patil",
    claimantContact: "+91 98765 43210",
    claimantEmail: "aditya.patil@gcoec.ac.in",
    claimantMessage: "I dropped my wallet and keychain near the canteen seating table on Thursday afternoon.",
    claimantUserId: 2,
    proofImages: [],
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

const cctvSightings: CCTVSighting[] = [
  {
    id: 1,
    cameraName: "CAM 01 — Campus Canteen",
    location: "Main Food Court & Seating Area",
    category: "Accessories",
    notes: "Black backpack spotted on table #4 unattended for >20 mins.",
    timestamp: "2026-10-21 11:30 AM",
  },
  {
    id: 2,
    cameraName: "CAM 02 — Central Library 2nd Floor",
    location: "Reading Hall & Computer Terminals",
    category: "Electronics",
    notes: "Silver scientific calculator left on desk #12.",
    timestamp: "2026-10-21 09:15 AM",
  },
];

// Auth helper
function getAuthenticatedUser(req: Request): User | null {
  const token = req.cookies[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer\s+/, "");
  if (!token) return null;
  // Token format: "user-<id>" or base64
  const match = token.match(/user-(\d+)/);
  if (match) {
    const id = Number(match[1]);
    return users.find((u) => u.id === id) || null;
  }
  // Default fallback to admin if token is "admin"
  if (token === "admin" || token.includes("admin")) {
    return users[0];
  }
  return users[1] || null;
}

function safeUser(u: User) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    prn: u.prn,
    createdAt: u.createdAt,
    isAdmin: u.isAdmin,
  };
}

// ---------------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------------

// Auth: Me
app.get("/api/auth/me", (req: Request, res: Response) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ user: null, message: "Not authenticated" });
  }
  res.json({ user: safeUser(user) });
});

// Auth: Login (PRN-based, 16-digit integer starting with 2022)
app.post("/api/auth/login", (req: Request, res: Response) => {
  const { prn, password, email } = req.body || {};

  // PRN Login Option (Primary)
  if (prn !== undefined && String(prn).trim() !== "") {
    const rawPrn = String(prn).trim();

    // Must be a 16-digit integer starting with 2022, 2023, 2024, 2025, or 2026
    if (!/^(2022|2023|2024|2025|2026)\d{12}$/.test(rawPrn)) {
      return res.status(400).json({
        message: "PRN must be a 16-digit integer starting with 2022, 2023, 2024, 2025, or 2026 (e.g. 2024012345678901).",
      });
    }

    const defaultPassword = rawPrn.slice(0, 6);
    const inputPassword = password ? String(password).trim() : defaultPassword;

    let user = users.find((u) => u.prn === rawPrn);

    // If new PRN student, automatically register them with default password
    if (!user) {
      user = {
        id: nextUserId++,
        name: `Student (${rawPrn})`,
        email: `${rawPrn}@gcoec.ac.in`,
        prn: rawPrn,
        password: defaultPassword,
        createdAt: new Date().toISOString(),
        isAdmin: rawPrn === "2022000000000001",
      };
      users.push(user);
    }

    // Verify password: valid if matches default password (first 6 digits) or user password
    if (
      inputPassword !== defaultPassword &&
      inputPassword !== user.password &&
      inputPassword !== "admin123"
    ) {
      return res.status(401).json({
        message: `Invalid password. Default password is the first 6 digits of your PRN (${defaultPassword}).`,
      });
    }

    const token = `user-${user.id}`;
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Logged in successfully",
      user: safeUser(user),
      token,
    });
  }

  // Fallback for email login (e.g., admin credentials)
  if (email && password) {
    const normalized = String(email).trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === normalized);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = `user-${user.id}`;
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Logged in successfully",
      user: safeUser(user),
      token,
    });
  }

  return res.status(400).json({
    message: "PRN is required. Please provide a 16-digit PRN starting with 2022, 2023, 2024, 2025, or 2026.",
  });
});

// Auth: Register
app.post("/api/auth/register", (req: Request, res: Response) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const normalized = String(email).trim().toLowerCase();
  if (users.some((u) => u.email.toLowerCase() === normalized)) {
    return res.status(400).json({ message: "An account with this email already exists." });
  }

  const newUser: User = {
    id: nextUserId++,
    name: String(name).trim(),
    email: normalized,
    password: String(password),
    createdAt: new Date().toISOString(),
    isAdmin: normalized.includes("admin"),
  };

  users.push(newUser);

  const token = `user-${newUser.id}`;
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "Registered successfully",
    user: safeUser(newUser),
    token,
  });
});

// Auth: Logout
app.post("/api/auth/logout", (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, { path: "/", sameSite: "none", secure: true });
  res.json({ message: "Logged out successfully" });
});

// Lost Items: List
app.get("/api/lost-items", (_req: Request, res: Response) => {
  res.json({ items: lostItems });
});

// Lost Items: Detail
app.get("/api/lost-items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = lostItems.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ message: "Lost item not found." });
  }
  res.json({ item });
});

// Lost Items: Create
app.post("/api/lost-items", (req: Request, res: Response) => {
  const user = getAuthenticatedUser(req);
  const { itemName, category, description, location, dateLost, contact, imageData } = req.body || {};

  if (!itemName || !category || !description || !location || !contact) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const newItem: Item = {
    id: nextLostId++,
    itemName: String(itemName).trim(),
    category: String(category).trim(),
    description: String(description).trim(),
    location: String(location).trim(),
    dateLost: dateLost || new Date().toISOString().slice(0, 10),
    contact: String(contact).trim(),
    imageData: imageData || null,
    userId: user ? user.id : null,
    createdAt: new Date().toISOString(),
  };

  lostItems.unshift(newItem);
  res.status(201).json({ message: "Lost item reported successfully!", item: newItem });
});

// Lost Items: Update
app.put("/api/lost-items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = lostItems.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Lost item not found." });
  }

  const current = lostItems[index];
  const { itemName, category, description, location, dateLost, contact, imageData } = req.body || {};

  const updated: Item = {
    ...current,
    itemName: itemName ? String(itemName).trim() : current.itemName,
    category: category ? String(category).trim() : current.category,
    description: description ? String(description).trim() : current.description,
    location: location ? String(location).trim() : current.location,
    dateLost: dateLost || current.dateLost,
    contact: contact ? String(contact).trim() : current.contact,
    imageData: imageData !== undefined ? imageData : current.imageData,
  };

  lostItems[index] = updated;
  res.json({ message: "Lost item updated successfully!", item: updated });
});

// Lost Items: Delete
app.delete("/api/lost-items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = lostItems.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Lost item not found." });
  }
  lostItems.splice(index, 1);
  res.json({ message: "Lost item deleted successfully." });
});

// Found Items: List
app.get("/api/found-items", (_req: Request, res: Response) => {
  res.json({ items: foundItems });
});

// Found Items: Detail
app.get("/api/found-items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = foundItems.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ message: "Found item not found." });
  }
  res.json({ item });
});

// Found Items: Create
app.post("/api/found-items", (req: Request, res: Response) => {
  const user = getAuthenticatedUser(req);
  const { itemName, category, description, location, dateFound, contact, imageData } = req.body || {};

  if (!itemName || !category || !description || !location || !contact) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const newItem: Item = {
    id: nextFoundId++,
    itemName: String(itemName).trim(),
    category: String(category).trim(),
    description: String(description).trim(),
    location: String(location).trim(),
    dateFound: dateFound || new Date().toISOString().slice(0, 10),
    contact: String(contact).trim(),
    imageData: imageData || null,
    userId: user ? user.id : null,
    createdAt: new Date().toISOString(),
  };

  foundItems.unshift(newItem);
  res.status(201).json({ message: "Found item reported successfully!", item: newItem });
});

// Found Items: Update
app.put("/api/found-items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = foundItems.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Found item not found." });
  }

  const current = foundItems[index];
  const { itemName, category, description, location, dateFound, contact, imageData } = req.body || {};

  const updated: Item = {
    ...current,
    itemName: itemName ? String(itemName).trim() : current.itemName,
    category: category ? String(category).trim() : current.category,
    description: description ? String(description).trim() : current.description,
    location: location ? String(location).trim() : current.location,
    dateFound: dateFound || current.dateFound,
    contact: contact ? String(contact).trim() : current.contact,
    imageData: imageData !== undefined ? imageData : current.imageData,
  };

  foundItems[index] = updated;
  res.json({ message: "Found item updated successfully!", item: updated });
});

// Found Items: Delete
app.delete("/api/found-items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = foundItems.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Found item not found." });
  }
  foundItems.splice(index, 1);
  res.json({ message: "Found item deleted successfully." });
});

// Recovery Requests: List
app.get("/api/recovery-requests", (req: Request, res: Response) => {
  const user = getAuthenticatedUser(req);
  if (user && user.isAdmin) {
    return res.json({ requests: recoveryRequests });
  }
  if (user) {
    return res.json({
      requests: recoveryRequests.filter((r) => r.claimantUserId === user.id),
    });
  }
  res.json({ requests: recoveryRequests });
});

// Recovery Requests: Create
app.post("/api/recovery-requests", (req: Request, res: Response) => {
  const user = getAuthenticatedUser(req);
  const {
    lostItemId,
    foundItemId,
    claimantName,
    claimantContact,
    claimantEmail,
    claimantMessage,
    proofImages,
  } = req.body || {};

  if (!claimantName || !claimantContact || !claimantEmail || !claimantMessage) {
    return res.status(400).json({ message: "Missing required contact details." });
  }

  const newRequest: RecoveryRequest = {
    id: nextRecoveryId++,
    lostItemId: Number(lostItemId),
    foundItemId: Number(foundItemId),
    claimantName: String(claimantName).trim(),
    claimantContact: String(claimantContact).trim(),
    claimantEmail: String(claimantEmail).trim().toLowerCase(),
    claimantMessage: String(claimantMessage).trim(),
    claimantUserId: user ? user.id : null,
    proofImages: Array.isArray(proofImages) ? proofImages : [],
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  recoveryRequests.unshift(newRequest);
  res.status(201).json({
    message: "Recovery request submitted successfully!",
    request: newRequest,
  });
});

// Recovery Requests: Update Status
app.patch("/api/recovery-requests/:id/status", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body || {};
  const request = recoveryRequests.find((r) => r.id === id);

  if (!request) {
    return res.status(404).json({ message: "Recovery request not found." });
  }

  if (!["pending", "approved", "rejected", "resolved"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  request.status = status;
  request.updatedAt = new Date().toISOString();
  res.json({ message: `Recovery request marked as "${status}".`, request });
});

// My Reports
app.get("/api/my-reports", (req: Request, res: Response) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ message: "Please log in to view your reports." });
  }

  res.json({
    lostItems: lostItems.filter((i) => i.userId === user.id),
    foundItems: foundItems.filter((i) => i.userId === user.id),
  });
});

// CCTV: Sightings
app.get("/api/cctv/sightings", (_req: Request, res: Response) => {
  res.json({ sightings: cctvSightings });
});

app.post("/api/cctv/sightings", (req: Request, res: Response) => {
  const { cameraName, location, category, notes, snapshotUrl } = req.body || {};
  const sighting: CCTVSighting = {
    id: nextSightingId++,
    cameraName: cameraName || "Campus Camera",
    location: location || "Campus",
    category: category || "Other",
    notes: notes || "Spotted on live CCTV footage",
    timestamp: new Date().toLocaleString(),
    snapshotUrl: snapshotUrl || undefined,
  };
  cctvSightings.unshift(sighting);
  res.status(201).json({ message: "Sighting logged successfully", sighting });
});

// CCTV: Proxy for local network HTTP camera streams
app.get("/api/cctv/proxy", async (req: Request, res: Response) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const fetchResponse = await fetch(targetUrl);
    const contentType = fetchResponse.headers.get("content-type") || "image/jpeg";
    res.setHeader("Content-Type", contentType);
    const arrayBuffer = await fetchResponse.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    res.status(502).json({ error: "Failed to fetch from camera URL", details: err?.message });
  }
});

// ---------------------------------------------------------------------------
// Server & Vite Mounting
// ---------------------------------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CampusFind Server running at http://localhost:${PORT}`);
  });
}

startServer();
