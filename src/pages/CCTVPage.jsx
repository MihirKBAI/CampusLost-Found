import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import {
  Camera,
  Monitor,
  Maximize2,
  Minimize2,
  RefreshCw,
  ExternalLink,
  Shield,
  Download,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Zap,
  ZoomIn,
  ZoomOut,
  Sliders,
  Eye,
  FileSearch,
  PlusCircle,
  Clock,
  Radio,
  Wifi,
  ChevronRight,
  Info,
  Layers,
  Copy,
  Check,
} from "lucide-react";

const PRESET_CAMERAS = [
  {
    id: "ipwebcam-custom",
    name: "Android IP Webcam (Your Phone)",
    location: "Configurable / Mobile",
    type: "ipwebcam",
    defaultUrl: "http://192.168.1.100:8080",
    description: "Real-time feed streamed from your Android phone running the IP Webcam app.",
  },
  {
    id: "cam-canteen",
    name: "CAM 01 — Campus Canteen",
    location: "Main Food Court & Seating Area",
    type: "simulated",
    scene: "canteen",
    description: "High-traffic student dining area where wallets, phones, and water bottles are frequently misplaced.",
  },
  {
    id: "cam-library",
    name: "CAM 02 — Central Library 2nd Floor",
    location: "Reading Hall & Computer Terminals",
    type: "simulated",
    scene: "library",
    description: "Silent study zone and laptop stations where notebooks, chargers, and calculators are left behind.",
  },
  {
    id: "cam-gate",
    name: "CAM 03 — Main Campus Entrance",
    location: "Security Post & Turnstiles",
    type: "simulated",
    scene: "gate",
    description: "Surveillance of main campus gate and bicycle parking area.",
  },
  {
    id: "device-webcam",
    name: "CAM 04 — Connected Device Camera",
    location: "Local Laptop / USB Webcam",
    type: "webrtc",
    description: "Stream live video directly from your webcam or connected USB camera via WebRTC.",
  },
];

const SUGGESTED_APPS = [
  {
    name: "IP Webcam",
    developer: "Pavel Khlebovich",
    platform: "Android (Google Play & F-Droid)",
    badge: "Recommended",
    badgeColor: "bg-emerald-500/20 text-emerald-800 border-emerald-300",
    summary: "The de-facto standard for turning any Android smartphone into a network surveillance camera.",
    features: [
      "Stream video inside local WiFi network without internet",
      "Multiple viewing formats: Web browser, MJPEG, VLC, and snapshot photos",
      "Built-in web server with flash/torch control and digital zoom",
      "Zero cost, lightweight, runs on Android 5.0 through Android 15+",
    ],
    defaultPort: "8080",
    videoPath: "/video",
    snapshotPath: "/shot.jpg",
    webPath: "/",
    setupSteps: [
      "Install 'IP Webcam' by Pavel Khlebovich from Google Play Store or APKMirror.",
      "Connect your Android phone to the same Wi-Fi network as this computer.",
      "Open the app, scroll to the bottom, and tap 'Start server'.",
      "Note the IP address displayed on your phone screen (e.g. http://192.168.1.45:8080).",
      "Paste that address into the IP Camera URL input above and choose 'Iframe Window' or 'MJPEG Stream'!",
    ],
  },
  {
    name: "DroidCam Webcam & OBS",
    developer: "Dev47Apps",
    platform: "Android & iOS",
    badge: "Low Latency",
    badgeColor: "bg-blue-500/20 text-blue-800 border-blue-300",
    summary: "High performance streaming over WiFi or USB cable with ultra-low latency.",
    features: [
      "Runs on both Android and Apple iOS devices",
      "Direct HTTP stream on port 4747",
      "Keeps phone screen dimmed to conserve battery life",
    ],
    defaultPort: "4747",
    videoPath: "/video",
    snapshotPath: "/cam/1/frame.jpg",
    webPath: "/",
    setupSteps: [
      "Download DroidCam from Google Play or Apple App Store.",
      "Launch app; it will display 'WiFi IP' and 'DroidCam Port: 4747'.",
      "Enter http://<phone-ip>:4747 into the stream address.",
    ],
  },
  {
    name: "Security Camera CZ",
    developer: "Camera CZ Team",
    platform: "Android",
    badge: "Smart Motion",
    badgeColor: "bg-purple-500/20 text-purple-800 border-purple-300",
    summary: "Smart motion detection and HD streaming for repurposing old smartphones as permanent campus monitors.",
    features: [
      "Intelligent motion sensor alerts",
      "Night vision boost mode",
      "Local recording and snapshot capture",
    ],
    defaultPort: "8080",
    videoPath: "/stream",
    snapshotPath: "/snapshot.jpg",
    webPath: "/",
    setupSteps: [
      "Install Security Camera CZ on an Android phone mounted at a campus desk.",
      "Activate Local Network Stream in Settings.",
      "Connect stream URL to monitor real-time activity.",
    ],
  },
];

export default function CCTVPage() {
  const navigate = useNavigate();

  // Active camera state
  const [selectedCamId, setSelectedCamId] = useState("ipwebcam-custom");
  const [streamUrl, setStreamUrl] = useState("http://192.168.1.100:8080");
  const [embedMode, setEmbedMode] = useState("iframe"); // 'iframe' | 'mjpeg' | 'snapshot'
  const [snapshotInterval, setSnapshotInterval] = useState(1000); // ms
  const [streamStatus, setStreamStatus] = useState("idle"); // 'idle' | 'connected' | 'error' | 'loading'

  // Inspector video controls
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterMode, setFilterMode] = useState("normal"); // 'normal' | 'night' | 'contrast' | 'mono'
  const [showGrid, setShowGrid] = useState(true);
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Timecode clock
  const [currentTime, setCurrentTime] = useState(new Date());

  // Evidence snapshot state
  const [capturedSightings, setCapturedSightings] = useState([]);
  const [sightingModalOpen, setSightingModalOpen] = useState(false);
  const [currentSnapshotData, setCurrentSnapshotData] = useState(null);
  const [sightingNotes, setSightingNotes] = useState("");
  const [sightingLocation, setSightingLocation] = useState("Campus Canteen");
  const [sightingCategory, setSightingCategory] = useState("Electronics");

  // Tab for Guide vs Inspector
  const [activeTab, setActiveTab] = useState("inspector"); // 'inspector' | 'guide' | 'sightings'
  const [copiedUrl, setCopiedUrl] = useState(false);

  // References
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const iframeRef = useRef(null);
  const streamTrackRef = useRef(null);
  const simulatedAnimRef = useRef(null);

  const activeCam = PRESET_CAMERAS.find((c) => c.id === selectedCamId) || PRESET_CAMERAS[0];

  // Update real-time clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle WebRTC stream when device-webcam is selected
  useEffect(() => {
    if (selectedCamId === "device-webcam") {
      setStreamStatus("loading");
      navigator.mediaDevices
        ?.getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          streamTrackRef.current = stream.getTracks()[0];
          setStreamStatus("connected");
        })
        .catch((err) => {
          console.error("Camera access error:", err);
          setStreamStatus("error");
        });

      return () => {
        if (streamTrackRef.current) {
          streamTrackRef.current.stop();
        }
      };
    } else {
      if (streamTrackRef.current) {
        streamTrackRef.current.stop();
        streamTrackRef.current = null;
      }
    }
  }, [selectedCamId]);

  // Handle Simulated Canvas feeds (Canteen, Library, Gate)
  useEffect(() => {
    if (activeCam.type === "simulated") {
      setStreamStatus("connected");
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let frame = 0;

      const renderSimulation = () => {
        if (isFrozen) {
          simulatedAnimRef.current = requestAnimationFrame(renderSimulation);
          return;
        }
        frame++;
        const width = canvas.width;
        const height = canvas.height;

        // Background
        if (activeCam.scene === "canteen") {
          // Warm canteen floor & tables
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, "#1e2430");
          grad.addColorStop(1, "#12161f");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Tables perspective
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 2;
          for (let i = 0; i < 4; i++) {
            const y = 240 + i * 80;
            ctx.strokeRect(100 + i * 30, y, 220, 50);
            ctx.strokeRect(480 + i * 15, y, 220, 50);
          }

          // Simulated moving students (dots / silhouettes)
          const personX = 260 + Math.sin(frame * 0.02) * 120;
          const personY = 320 + Math.cos(frame * 0.015) * 40;
          ctx.fillStyle = "rgba(49, 92, 155, 0.8)";
          ctx.beginPath();
          ctx.arc(personX, personY, 18, 0, Math.PI * 2);
          ctx.fill();

          // Target bounding box over a left-behind backpack on a table
          ctx.strokeStyle = "rgba(220, 38, 38, 0.85)";
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(160, 290, 75, 45);
          ctx.setLineDash([]);
          ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText("ATTN: UNATTENDED BAG", 160, 282);
        } else if (activeCam.scene === "library") {
          // Library shelves & reading desks
          ctx.fillStyle = "#141a24";
          ctx.fillRect(0, 0, width, height);

          // Bookshelves background
          ctx.fillStyle = "#222a38";
          for (let col = 0; col < 6; col++) {
            ctx.fillRect(50 + col * 125, 60, 80, 200);
          }

          // Desks
          ctx.fillStyle = "#2c3647";
          ctx.fillRect(80, 350, 640, 100);

          // Unattended wallet / phone on desk
          const pulse = (Math.sin(frame * 0.05) + 1) / 2;
          ctx.strokeStyle = `rgba(234, 179, 8, ${0.4 + pulse * 0.6})`;
          ctx.lineWidth = 2;
          ctx.strokeRect(320, 380, 48, 32);
          ctx.fillStyle = "#eab308";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText("OBJECT: WALLET/CALCULATOR", 320, 372);
        } else {
          // Gate
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(0, 0, width, height);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.strokeRect(150, 180, 500, 240);
          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 12px sans-serif";
          ctx.fillText("CAMPUS GATE 1 • VEHICLE / PEDESTRIAN SCAN", 170, 210);
        }

        // Noise / surveillance scan lines
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 1);
        }

        // Scan line sweep
        const sweepY = (frame * 2.5) % height;
        ctx.fillStyle = "rgba(49, 92, 155, 0.15)";
        ctx.fillRect(0, sweepY, width, 3);

        simulatedAnimRef.current = requestAnimationFrame(renderSimulation);
      };

      simulatedAnimRef.current = requestAnimationFrame(renderSimulation);
      return () => {
        if (simulatedAnimRef.current) {
          cancelAnimationFrame(simulatedAnimRef.current);
        }
      };
    }
  }, [activeCam, isFrozen]);

  // Compute CSS filter string
  const getFilterStyle = () => {
    switch (filterMode) {
      case "night":
        return "hue-rotate(90deg) contrast(175%) brightness(130%) saturate(200%)";
      case "contrast":
        return "contrast(220%) brightness(110%)";
      case "mono":
        return "grayscale(100%) contrast(150%)";
      default:
        return "none";
    }
  };

  // Capture frame as snapshot
  const handleCaptureSnapshot = () => {
    let dataUrl = null;

    if (activeCam.type === "simulated" && canvasRef.current) {
      dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.9);
    } else if (selectedCamId === "device-webcam" && videoRef.current) {
      const v = videoRef.current;
      const c = document.createElement("canvas");
      c.width = v.videoWidth || 640;
      c.height = v.videoHeight || 480;
      const ctx = c.getContext("2d");
      ctx.drawImage(v, 0, 0, c.width, c.height);
      dataUrl = c.toDataURL("image/jpeg", 0.9);
    } else {
      // IP webcam snapshot simulation/fallback
      const c = document.createElement("canvas");
      c.width = 640;
      c.height = 360;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(`CCTV SNAPSHOT: ${activeCam.name}`, 30, 80);
      ctx.font = "14px monospace";
      ctx.fillText(`LOCATION: ${activeCam.location}`, 30, 110);
      ctx.fillText(`TIMESTAMP: ${currentTime.toISOString()}`, 30, 140);
      ctx.fillText(`STREAM SOURCE: ${streamUrl}`, 30, 170);
      dataUrl = c.toDataURL("image/jpeg", 0.9);
    }

    setCurrentSnapshotData(dataUrl);
    setSightingLocation(activeCam.location || "Campus");
    setSightingModalOpen(true);
  };

  // Save Sighting to local list
  const handleSaveSighting = () => {
    const newSighting = {
      id: Date.now(),
      cameraName: activeCam.name,
      location: sightingLocation,
      category: sightingCategory,
      notes: sightingNotes || "Item flagged during live CCTV surveillance inspection.",
      timestamp: currentTime.toLocaleString(),
      snapshotUrl: currentSnapshotData,
    };
    setCapturedSightings((prev) => [newSighting, ...prev]);
    setSightingModalOpen(false);
    setSightingNotes("");
  };

  // Toggle fullscreen for container
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Helper to construct IP Webcam specific URLs
  const cleanBaseUrl = streamUrl.trim().replace(/\/$/, "");
  const mjpegStreamUrl = cleanBaseUrl.includes(":") ? `${cleanBaseUrl}/video` : cleanBaseUrl;
  const snapshotPollUrl = cleanBaseUrl.includes(":") ? `${cleanBaseUrl}/shot.jpg` : cleanBaseUrl;

  const handleCopyUrl = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <PageShell title="CCTV" subtitle="Campus surveillance feeds and IP Webcam real-time inspection.">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-8 sm:py-6">
        {/* Top Header Card */}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl border border-line bg-surface p-5 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-white shadow-inner">
              <Camera size={26} className="text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-ink">Campus CCTV & IP Webcam</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE INSPECTOR
                </span>
              </div>
              <p className="text-sm text-mute">
                Connect live video from any Android IP Webcam app or network security camera. Spot unattended items and cross-reference with Campus Lost & Found.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex shrink-0 items-center rounded-lg border border-line bg-paper p-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("inspector")}
              className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 transition-all cursor-pointer ${
                activeTab === "inspector" ? "bg-surface font-semibold text-ink shadow-sm" : "text-mute hover:text-ink"
              }`}
            >
              <Monitor size={16} />
              <span>Stream Inspector</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("guide")}
              className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 transition-all cursor-pointer ${
                activeTab === "guide" ? "bg-surface font-semibold text-ink shadow-sm" : "text-mute hover:text-ink"
              }`}
            >
              <HelpCircle size={16} />
              <span>IP Webcam Guide</span>
              <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[11px] text-primary font-bold">App</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sightings")}
              className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 transition-all cursor-pointer ${
                activeTab === "sightings" ? "bg-surface font-semibold text-ink shadow-sm" : "text-mute hover:text-ink"
              }`}
            >
              <FileSearch size={16} />
              <span>Evidence Log ({capturedSightings.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INSPECTOR VIEW */}
        {activeTab === "inspector" && (
          <div className="space-y-6">
            {/* Stream Settings & Camera Bar */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* Camera Selector */}
              <div className="rounded-xl border border-line bg-surface p-4 shadow-sm lg:col-span-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-mute">
                  Select Surveillance Camera
                </label>
                <div className="space-y-2">
                  {PRESET_CAMERAS.map((cam) => {
                    const isSelected = selectedCamId === cam.id;
                    return (
                      <button
                        key={cam.id}
                        type="button"
                        onClick={() => {
                          setSelectedCamId(cam.id);
                          if (cam.defaultUrl) setStreamUrl(cam.defaultUrl);
                          setZoomLevel(1);
                        }}
                        className={`w-full rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/5 text-ink ring-1 ring-primary"
                            : "border-line bg-paper/50 text-mute hover:border-line hover:bg-paper"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-ink">{cam.name}</span>
                          {cam.type === "ipwebcam" && (
                            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                              Android IP
                            </span>
                          )}
                          {cam.type === "simulated" && (
                            <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-bold text-sky-700">
                              Demo Feed
                            </span>
                          )}
                          {cam.type === "webrtc" && (
                            <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                              Local Cam
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-mute line-clamp-1">{cam.location}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stream URL & Network Configuration */}
              <div className="rounded-xl border border-line bg-surface p-4 shadow-sm lg:col-span-8">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-mute">
                    IP Webcam Server Address & Stream Window
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-mute">Stream Mode:</span>
                    <button
                      type="button"
                      onClick={() => setEmbedMode("iframe")}
                      className={`rounded px-2 py-0.5 font-medium cursor-pointer ${
                        embedMode === "iframe" ? "bg-primary text-white" : "bg-paper text-mute"
                      }`}
                    >
                      Iframe Window
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmbedMode("mjpeg")}
                      className={`rounded px-2 py-0.5 font-medium cursor-pointer ${
                        embedMode === "mjpeg" ? "bg-primary text-white" : "bg-paper text-mute"
                      }`}
                    >
                      MJPEG Stream
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmbedMode("snapshot")}
                      className={`rounded px-2 py-0.5 font-medium cursor-pointer ${
                        embedMode === "snapshot" ? "bg-primary text-white" : "bg-paper text-mute"
                      }`}
                    >
                      Snapshot Poll
                    </button>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-mute">
                      <Wifi size={16} />
                    </div>
                    <input
                      type="text"
                      value={streamUrl}
                      onChange={(e) => setStreamUrl(e.target.value)}
                      placeholder="e.g. http://192.168.1.100:8080"
                      className="w-full rounded-lg border border-line bg-paper py-2 pl-9 pr-3 text-sm font-mono text-ink placeholder-mute focus:border-primary focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (iframeRef.current) {
                          iframeRef.current.src = iframeRef.current.src;
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-sm hover:bg-paper cursor-pointer"
                      title="Reload stream window"
                    >
                      <RefreshCw size={14} />
                      <span>Reload</span>
                    </button>
                    <a
                      href={streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-ink-hover cursor-pointer"
                      title="Open directly in dedicated browser window"
                    >
                      <ExternalLink size={14} />
                      <span>Pop-out Window</span>
                    </a>
                  </div>
                </div>

                {/* Network & Mixed-Content Advisory */}
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-paper/70 p-2.5 text-xs text-mute">
                  <Info size={15} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="font-semibold text-ink">Local Network Notice: </span>
                    Android IP Webcam streams via <code className="rounded bg-white px-1 py-0.5 font-mono text-ink">http://192.168.x.x:8080</code>.
                    If your browser restricts mixed-content HTTP frames in this cloud preview, switch to <strong>Snapshot Poll</strong> mode or click <strong>Pop-out Window</strong> to view in a dedicated browser tab!
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE SURVEILLANCE MONITOR WINDOW */}
            <div
              ref={containerRef}
              className={`relative overflow-hidden rounded-xl border border-ink/30 bg-black text-white shadow-2xl transition-all ${
                isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "min-h-[500px]"
              }`}
            >
              {/* Surveillance Top Bar Overlay */}
              <div className="absolute left-0 right-0 top-0 z-20 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-3 sm:p-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded bg-black/60 px-2.5 py-1 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold tracking-wider text-emerald-400">REC [LIVE]</span>
                  </div>
                  <span className="font-semibold tracking-wide text-white drop-shadow">
                    {activeCam.name}
                  </span>
                  <span className="hidden text-white/60 sm:inline">&bull;</span>
                  <span className="hidden text-white/80 sm:inline">{activeCam.location}</span>
                </div>

                {showTimestamp && (
                  <div className="flex items-center gap-2 rounded bg-black/60 px-2.5 py-1 font-mono text-white/90 backdrop-blur-md">
                    <Clock size={13} className="text-emerald-400" />
                    <span>
                      {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()} IST
                    </span>
                  </div>
                )}
              </div>

              {/* VIDEO STREAM VIEWPORT */}
              <div
                className="relative flex min-h-[480px] w-full items-center justify-center overflow-hidden bg-zinc-950"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  transition: "transform 0.15s ease-out",
                  filter: getFilterStyle(),
                }}
              >
                {/* 1. If simulated campus camera is active */}
                {activeCam.type === "simulated" && (
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={480}
                    className="max-h-[70vh] w-full object-cover"
                  />
                )}

                {/* 2. If WebRTC Local Device camera is active */}
                {selectedCamId === "device-webcam" && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="max-h-[70vh] w-full object-cover"
                  />
                )}

                {/* 3. If IP Webcam is selected */}
                {activeCam.type === "ipwebcam" && (
                  <>
                    {embedMode === "iframe" && (
                      <div className="relative h-full min-h-[480px] w-full">
                        <iframe
                          ref={iframeRef}
                          src={streamUrl}
                          title="Android IP Webcam Stream Window"
                          className="h-[480px] w-full border-0 bg-zinc-900"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          allow="camera; microphone"
                        />
                        {/* Overlay helper in case iframe is blocked by CORS/Mixed content */}
                        <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/70 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur-md">
                          Viewing client window from {streamUrl}
                        </div>
                      </div>
                    )}

                    {embedMode === "mjpeg" && (
                      <div className="flex h-full min-h-[480px] w-full items-center justify-center bg-zinc-900 p-4">
                        <img
                          src={mjpegStreamUrl}
                          alt="Live MJPEG Stream"
                          className="max-h-[70vh] max-w-full rounded object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            setStreamStatus("error");
                          }}
                        />
                        {streamStatus === "error" && (
                          <div className="max-w-md rounded-xl border border-white/10 bg-zinc-900/90 p-6 text-center text-white backdrop-blur-md">
                            <AlertCircle size={36} className="mx-auto mb-3 text-amber-400" />
                            <h3 className="font-semibold text-base">Direct Stream Unavailable</h3>
                            <p className="mt-1 text-xs text-white/70">
                              Could not load MJPEG stream from <code>{mjpegStreamUrl}</code>. Make sure the IP Webcam app is running on your phone and connected to the same Wi-Fi.
                            </p>
                            <div className="mt-4 flex justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => setEmbedMode("snapshot")}
                                className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-white"
                              >
                                Try Snapshot Mode
                              </button>
                              <a
                                href={streamUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
                              >
                                Open in Window
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {embedMode === "snapshot" && (
                      <SnapshotStreamPlayer
                        snapshotUrl={snapshotPollUrl}
                        interval={snapshotInterval}
                        onSnapshotReady={(img) => {}}
                      />
                    )}
                  </>
                )}
              </div>

              {/* SURVEILLANCE GRID OVERLAY */}
              {showGrid && (
                <div className="pointer-events-none absolute inset-0 z-10 grid grid-cols-3 grid-rows-3 border border-emerald-500/20">
                  <div className="border-r border-b border-emerald-500/15 p-2 text-[10px] font-mono text-emerald-500/40">SEC-A1</div>
                  <div className="border-r border-b border-emerald-500/15 p-2 text-[10px] font-mono text-emerald-500/40">SEC-A2</div>
                  <div className="border-b border-emerald-500/15 p-2 text-[10px] font-mono text-emerald-500/40">SEC-A3</div>
                  <div className="border-r border-b border-emerald-500/15 p-2 text-[10px] font-mono text-emerald-500/40">SEC-B1</div>
                  <div className="border-r border-b border-emerald-500/15 flex items-center justify-center">
                    {/* Center reticle */}
                    <div className="h-8 w-8 rounded-full border border-emerald-500/30 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                    </div>
                  </div>
                  <div className="border-b border-emerald-500/15 p-2 text-[10px] font-mono text-emerald-500/40">SEC-B3</div>
                  <div className="border-r border-emerald-500/15 p-2 text-[10px] font-mono text-emerald-500/40">SEC-C1</div>
                  <div className="border-r border-emerald-500/15 p-2 text-[10px] font-mono text-emerald-500/40">SEC-C2</div>
                  <div className="p-2 text-[10px] font-mono text-emerald-500/40">SEC-C3</div>
                </div>
              )}

              {/* INSPECTOR BOTTOM CONTROL BAR */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 text-xs text-white">
                {/* Left: Zoom & Filters */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 rounded-lg bg-black/70 p-1 border border-white/10 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                      className="rounded p-1 hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut size={15} />
                    </button>
                    <span className="px-1.5 font-mono text-xs">{zoomLevel.toFixed(1)}x</span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
                      className="rounded p-1 hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn size={15} />
                    </button>
                  </div>

                  {/* Filter Mode Selector */}
                  <div className="flex items-center rounded-lg bg-black/70 p-1 border border-white/10 backdrop-blur-md">
                    <span className="px-2 text-white/50 text-[11px]">Filter:</span>
                    <button
                      type="button"
                      onClick={() => setFilterMode("normal")}
                      className={`rounded px-2 py-0.5 text-[11px] font-medium cursor-pointer ${
                        filterMode === "normal" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterMode("night")}
                      className={`rounded px-2 py-0.5 text-[11px] font-medium cursor-pointer ${
                        filterMode === "night" ? "bg-emerald-500/30 text-emerald-300" : "text-white/60 hover:text-white"
                      }`}
                    >
                      Night Vision
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterMode("contrast")}
                      className={`rounded px-2 py-0.5 text-[11px] font-medium cursor-pointer ${
                        filterMode === "contrast" ? "bg-amber-500/30 text-amber-300" : "text-white/60 hover:text-white"
                      }`}
                    >
                      Hi-Contrast
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterMode("mono")}
                      className={`rounded px-2 py-0.5 text-[11px] font-medium cursor-pointer ${
                        filterMode === "mono" ? "bg-white/30 text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      B&W
                    </button>
                  </div>

                  {/* Grid Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowGrid((g) => !g)}
                    className={`rounded-lg border border-white/10 bg-black/70 px-2.5 py-1.5 text-[11px] font-medium backdrop-blur-md cursor-pointer ${
                      showGrid ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Grid Overlay
                  </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCaptureSnapshot}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-lost px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-lost-dark transition-colors cursor-pointer"
                  >
                    <Camera size={14} />
                    <span>Capture Evidence Frame</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="rounded-lg border border-white/10 bg-black/70 p-2 text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-md cursor-pointer"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Inspector"}
                  >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Lost & Found Cross-Reference Strip */}
            <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lost/10 text-lost">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Spotted a misplaced or unattended item on CCTV?</h3>
                    <p className="text-xs text-mute">
                      Take a snapshot to document proof of location, or directly file a Found Item report pre-filled with this camera footage.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCaptureSnapshot}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink hover:bg-line transition-colors cursor-pointer"
                  >
                    <Camera size={14} />
                    <span>Freeze &amp; Tag Item</span>
                  </button>
                  <Link
                    to={`/lost-items?q=${encodeURIComponent(activeCam.location)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                  >
                    <FileSearch size={14} />
                    <span>Search Lost Items in {activeCam.location}</span>
                  </Link>
                  <Link
                    to={`/report-found?location=${encodeURIComponent(activeCam.location)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-found px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-found-dark transition-colors"
                  >
                    <PlusCircle size={14} />
                    <span>Report Found Item</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RECOMMENDED APPS & SETUP GUIDE */}
        {activeTab === "guide" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-ink">
                Recommended IP Webcam Apps for Android
              </h2>
              <p className="mt-1 text-sm text-mute">
                To stream real-time CCTV surveillance into CampusFind, install any of these lightweight IP camera servers on an Android phone or tablet.
              </p>

              {/* App Cards */}
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {SUGGESTED_APPS.map((app) => (
                  <div
                    key={app.name}
                    className="flex flex-col justify-between rounded-xl border border-line bg-paper/40 p-5 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${app.badgeColor}`}>
                          {app.badge}
                        </span>
                        <span className="text-[11px] font-mono text-mute">{app.platform}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold text-ink">{app.name}</h3>
                      <p className="text-xs font-medium text-mute">by {app.developer}</p>
                      <p className="mt-2 text-xs text-ink/80 leading-relaxed">{app.summary}</p>

                      <div className="mt-4 border-t border-line/60 pt-3">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-mute">
                          Key Features:
                        </span>
                        <ul className="mt-2 space-y-1.5 text-xs text-ink/90">
                          {app.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-600" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-line/60 pt-4">
                      <div className="rounded-lg bg-surface p-2.5 text-xs font-mono text-mute">
                        <div>Default Port: <strong className="text-ink">{app.defaultPort}</strong></div>
                        <div>Video Endpoint: <strong className="text-primary">{app.videoPath}</strong></div>
                        <div>Snapshot Endpoint: <strong className="text-emerald-700">{app.snapshotPath}</strong></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Setup Walkthrough */}
            <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Step-by-Step: Connecting "IP Webcam" to CampusFind
                  </h3>
                  <p className="text-xs text-mute">Quick 3-minute setup for testing and production campus surveillance.</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    step: "1",
                    title: "Download App",
                    desc: "Search 'IP Webcam' on Google Play Store (developer: Pavel Khlebovich) and install it on your Android phone.",
                  },
                  {
                    step: "2",
                    title: "Connect Same Wi-Fi",
                    desc: "Ensure your phone and computer are connected to the same campus Wi-Fi or mobile hotspot.",
                  },
                  {
                    step: "3",
                    title: "Tap 'Start Server'",
                    desc: "Open the app, scroll all the way to the bottom, and tap the 'Start server' button.",
                  },
                  {
                    step: "4",
                    title: "Copy Phone IP",
                    desc: "Your phone screen will display an address like http://192.168.1.45:8080.",
                  },
                  {
                    step: "5",
                    title: "Stream in CampusFind",
                    desc: "Paste that address into CampusFind's stream input, choose 'Iframe Window' or 'MJPEG Stream', and inspect!",
                  },
                ].map((s) => (
                  <div key={s.step} className="rounded-xl border border-line bg-paper/50 p-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {s.step}
                    </span>
                    <h4 className="mt-2 text-sm font-bold text-ink">{s.title}</h4>
                    <p className="mt-1 text-xs text-mute leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Advanced Endpoints Documentation */}
              <div className="mt-6 rounded-xl border border-line/70 bg-paper/30 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-mute">
                  IP Webcam URL Endpoints Reference (Cheat Sheet)
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs font-mono">
                  <div className="rounded bg-surface p-2 border border-line">
                    <div className="text-[11px] text-mute">Web Client Window</div>
                    <code className="text-ink font-semibold">http://[IP]:8080/</code>
                  </div>
                  <div className="rounded bg-surface p-2 border border-line">
                    <div className="text-[11px] text-mute">Live MJPEG Video</div>
                    <code className="text-primary font-semibold">http://[IP]:8080/video</code>
                  </div>
                  <div className="rounded bg-surface p-2 border border-line">
                    <div className="text-[11px] text-mute">High-Res Still Photo</div>
                    <code className="text-emerald-700 font-semibold">http://[IP]:8080/shot.jpg</code>
                  </div>
                  <div className="rounded bg-surface p-2 border border-line">
                    <div className="text-[11px] text-mute">Audio WAV Stream</div>
                    <code className="text-amber-700 font-semibold">http://[IP]:8080/audio.wav</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EVIDENCE LOG & SIGHTINGS */}
        {activeTab === "sightings" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">
                    CCTV Captured Evidence &amp; Sighting Logs
                  </h2>
                  <p className="text-xs text-mute">
                    Snapshots captured during live surveillance. Use these frames to verify item claims or attach to new reports.
                  </p>
                </div>
                {capturedSightings.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCapturedSightings([])}
                    className="text-xs font-semibold text-lost hover:underline cursor-pointer"
                  >
                    Clear All Logs
                  </button>
                )}
              </div>

              {capturedSightings.length === 0 ? (
                <div className="mt-8 rounded-xl border border-dashed border-line p-10 text-center">
                  <Camera size={40} className="mx-auto text-mute/50" />
                  <h3 className="mt-3 text-base font-semibold text-ink">No CCTV Snapshots Captured Yet</h3>
                  <p className="mt-1 text-xs text-mute max-w-md mx-auto">
                    Go to the <strong>Stream Inspector</strong> tab and click <strong>"Capture Evidence Frame"</strong> while inspecting any camera feed.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("inspector")}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-ink-hover cursor-pointer"
                  >
                    <span>Open Inspector</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {capturedSightings.map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-xl border border-line bg-surface shadow-xs transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-video w-full bg-zinc-950">
                        <img
                          src={item.snapshotUrl}
                          alt="CCTV Snapshot"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-mono text-white/90">
                          {item.cameraName}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between text-xs text-mute">
                          <span>{item.location}</span>
                          <span className="font-mono">{item.timestamp}</span>
                        </div>

                        <p className="mt-2 text-xs text-ink/90 font-medium line-clamp-2">
                          {item.notes}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                          <a
                            href={item.snapshotUrl}
                            download={`cctv-evidence-${item.id}.jpg`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-mute hover:text-ink cursor-pointer"
                          >
                            <Download size={13} />
                            <span>Download</span>
                          </a>

                          <Link
                            to={`/report-found?location=${encodeURIComponent(item.location)}&notes=${encodeURIComponent(
                              `Spotted on CCTV (${item.cameraName}) at ${item.timestamp}: ${item.notes}`
                            )}`}
                            className="inline-flex items-center gap-1 rounded bg-found px-2.5 py-1 text-xs font-semibold text-white hover:bg-found-dark"
                          >
                            <PlusCircle size={13} />
                            <span>File Found Report</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* EVIDENCE CAPTURE MODAL */}
        {sightingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
              <div className="border-b border-line p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera size={18} className="text-lost" />
                    <h3 className="font-display text-base font-bold text-ink">
                      Log CCTV Item Sighting
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSightingModalOpen(false)}
                    className="rounded-md p-1 text-mute hover:bg-paper hover:text-ink cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {currentSnapshotData && (
                  <div className="overflow-hidden rounded-lg border border-line bg-black">
                    <img
                      src={currentSnapshotData}
                      alt="Captured Frame"
                      className="max-h-48 w-full object-contain"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-ink">Camera Location</label>
                  <input
                    type="text"
                    value={sightingLocation}
                    onChange={(e) => setSightingLocation(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-primary focus:bg-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Observed Item Category</label>
                  <select
                    value={sightingCategory}
                    onChange={(e) => setSightingCategory(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-primary focus:bg-surface focus:outline-none"
                  >
                    <option value="Electronics">Electronics (Laptop, Phone, Charger)</option>
                    <option value="Accessories">Accessories (Bag, Wallet, Umbrella)</option>
                    <option value="Documents">Documents (ID Card, Notes)</option>
                    <option value="Keys">Keys / Keychains</option>
                    <option value="Other">Other Items</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Surveillance Notes & Details</label>
                  <textarea
                    rows={3}
                    value={sightingNotes}
                    onChange={(e) => setSightingNotes(e.target.value)}
                    placeholder="Describe what was spotted (e.g., student left black backpack near canteen table #4 at 10:14 AM)..."
                    className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink placeholder-mute focus:border-primary focus:bg-surface focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-line bg-paper/40 p-4">
                <button
                  type="button"
                  onClick={() => setSightingModalOpen(false)}
                  className="rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink hover:bg-paper cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSighting}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-hover cursor-pointer"
                >
                  Save to Evidence Log
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

// Subcomponent: Live Snapshot Poller (robust against iframe mixed content limitations)
function SnapshotStreamPlayer({ snapshotUrl, interval = 1000, onSnapshotReady }) {
  const [currentSrc, setCurrentSrc] = useState(snapshotUrl);
  const [loadCount, setLoadCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Append cache buster to fetch fresh frame from IP webcam /shot.jpg
      const cacheBust = `${snapshotUrl}?t=${Date.now()}`;
      setCurrentSrc(cacheBust);
    }, interval);

    return () => clearInterval(timer);
  }, [snapshotUrl, interval]);

  return (
    <div className="flex h-full min-h-[480px] w-full flex-col items-center justify-center bg-zinc-950 p-4">
      {errorCount > 3 ? (
        <div className="max-w-md rounded-xl border border-white/10 bg-zinc-900/90 p-6 text-center text-white">
          <AlertCircle size={36} className="mx-auto mb-3 text-amber-400" />
          <h3 className="font-semibold text-base">Polling Server Error</h3>
          <p className="mt-1 text-xs text-white/70">
            Cannot reach <code>{snapshotUrl}</code>. Check that your phone’s IP Webcam is running and accessible over your local network.
          </p>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt="IP Webcam Snapshot Stream"
          className="max-h-[70vh] max-w-full rounded object-contain shadow-2xl"
          onLoad={() => {
            setLoadCount((c) => c + 1);
            setErrorCount(0);
          }}
          onError={() => setErrorCount((c) => c + 1)}
        />
      )}
      <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-white/50">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Polling rate: {interval}ms &bull; Frame: #{loadCount}</span>
      </div>
    </div>
  );
}
