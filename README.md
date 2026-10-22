# CampusFind — Intelligent Campus Lost & Found and CCTV Evidence System
**Government College of Engineering, Chandrapur (GCOEC)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)

---

## Table of Contents
1. [Introduction](#1-introduction)
   - [1.1 Background](#11-background)
   - [1.2 Problem Statement](#12-problem-statement)
   - [1.3 Motivation](#13-motivation)
   - [1.4 Scope](#14-scope)
   - [1.5 Objectives](#15-objectives)
2. [Literature Survey and Proposed System](#2-literature-survey-and-proposed-system)
   - [2.1 Existing Informal Approaches](#21-existing-informal-approaches)
   - [2.2 Limitations of Existing Approaches](#22-limitations-of-existing-approaches)
   - [2.3 Proposed CampusFind System](#23-proposed-campusfind-system)
3. [System Requirements Specification](#3-system-requirements-specification)
   - [3.1 Functional Requirements](#31-functional-requirements)
   - [3.2 Non-Functional Requirements](#32-non-functional-requirements)
   - [3.3 Hardware and Software Requirements](#33-hardware-and-software-requirements)
   - [3.4 User Roles and Permissions](#34-user-roles-and-permissions)
4. [System Design](#4-system-design)
   - [4.1 System Architecture](#41-system-architecture)
   - [4.2 Main User Workflow](#42-main-user-workflow)
   - [4.3 Use Case View](#43-use-case-view)
   - [4.4 Database Design and Schema](#44-database-design-and-schema)
   - [4.5 Heuristic Possible-Match Logic](#45-heuristic-possible-match-logic)
   - [4.6 Technology Stack](#46-technology-stack)
   - [4.7 Why the Stack Fits the Project](#47-why-the-stack-fits-the-project)
5. [Implementation and Module Description](#5-implementation-and-module-description)
   - [5.1 Authentication and Role-Based Access Control](#51-authentication-and-role-based-access-control)
   - [5.2 Lost and Found Reports Management](#52-lost-and-found-reports-management)
   - [5.3 Search, Filtering, and Indexing](#53-search-filtering-and-indexing)
   - [5.4 Privacy-Preserving Generic Vector Archetypes](#54-privacy-preserving-generic-vector-archetypes)
   - [5.5 Rule-Based Cross-Matching Engine](#55-rule-based-cross-matching-engine)
   - [5.6 Recovery Requests and Custody Verification](#56-recovery-requests-and-custody-verification)
   - [5.7 Campus Security Live CCTV and IP Webcam Integration](#57-campus-security-live-cctv-and-ip-webcam-integration)
   - [5.8 Administrator Functions and Uploader Approvals](#58-administrator-functions-and-uploader-approvals)
   - [5.9 Multi-Layered Security Measures](#59-multi-layered-security-measures)
6. [Results and System Testing](#6-results-and-system-testing)
   - [6.1 Testing Methodology](#62-testing-methodology)
   - [6.2 Recorded Automated Test Results](#62-recorded-automated-test-results)
   - [6.3 Representative Test Cases](#63-representative-test-cases)
   - [6.4 Deployment Details](#64-deployment-details)
7. [Conclusion, Future Scope, References](#7-conclusion-future-scope-references)
   - [7.1 Limitations of the Implemented System](#71-limitations-of-the-implemented-system)
   - [7.2 Future Scope](#72-future-scope)
   - [7.3 Conclusion](#73-conclusion)
   - [7.4 References](#74-references)
8. [Appendix: System Screenshots](#8-appendix-system-screenshots)

---

## 1. Introduction

### 1.1 Background
Higher educational institutions such as the Government College of Engineering, Chandrapur (GCOEC) host thousands of students, faculty members, administrative staff, and visitors daily across a sprawling campus comprising academic buildings, computer laboratories, mechanical workshops, central libraries, cafeterias, and outdoor sports complexes. In such active shared environments, personal belongings—including expensive electronic gadgets (laptops, mobile phones, scientific calculators, wireless earphones), government/college identification cards, laboratory drawing kits, notebooks, and keys—are routinely misplaced, forgotten, or lost.

### 1.2 Problem Statement
Traditional recovery mechanisms on university campuses are fragmented, ad-hoc, and inefficient. Lost items are reported across arbitrary WhatsApp student channels, physical notice boards, or informal inquiries at departmental security desks. This creates several acute challenges:
- High noise-to-signal ratio where critical lost alerts are drowned out within hours.
- Lack of centralized indexing or cross-referencing between someone who lost an item and someone who found it.
- **Privacy vulnerability and false ownership claims**: When raw photographs of valuable items are publicly broadcasted, dishonest individuals can observe distinguishing marks, serial indicators, or contents, allowing them to fraudulently claim items from campus offices.

### 1.3 Motivation
The primary motivation behind **CampusFind** is to restore transparency, security, and dignity to campus property recovery. By providing an intelligent, institutional digital registry backed by **privacy-preserving generic vector archetypes**, **network-level image masking**, **automated similarity matching**, and **live surveillance cross-referencing**, the system protects genuine owners while equipping security personnel with verified audit trails.

### 1.4 Scope
The scope of the CampusFind system encompasses:
- Institutional authentication verifying Permanent Registration Numbers (PRNs) and college domain email addresses.
- Multi-faceted registry for both lost and found property with real-time categorization and location indexing.
- Heuristic cross-matching algorithms that calculate similarity scores between lost reports and found logs.
- Privacy architecture wherein public viewers see generic vector avatars, while raw photographs are strictly locked to administrators and verified uploaders.
- Structured ownership dispute resolution via digital recovery requests and physical handover verification.
- Real-time CCTV / IP Webcam live inspection with instant evidence capture and report linkage.

### 1.5 Objectives
1. **Centralize Campus Property Logs**: Replace unstructured social media broadcasts with a searchable, unified repository.
2. **Eliminate Fraudulent Claims via Privacy-Preserving Archetypes**: Render high-fidelity generic vector representations of items to the public, concealing original photos until verified by authorized personnel.
3. **Automate Lost-to-Found Heuristic Matching**: Proactively suggest prospective matches to claimants and finders using textual tokenization, categorical alignment, and temporal proximity.
4. **Empower Campus Security Personnel**: Provide live surveillance camera stream monitoring and rapid evidence tagging for unattended bags and devices.
5. **Establish Auditable Custody Handover**: Maintain non-repudiable logs of recovery requests, verification messages, and administrative approvals.

---

## 2. Literature Survey and Proposed System

### 2.1 Existing Informal Approaches
Campus communities historically rely upon three informal mechanisms:
1. **Instant Messaging Groups (WhatsApp/Telegram)**: Broadcast messages containing photos and text sent into batch or department groups.
2. **Physical Notice Boards & Lost Boxes**: Paper slips pinned to library notice boards or unattended boxes kept at departmental reception desks.
3. **Verbal Inquiries**: Inquiries made directly to security guards at campus entry turnstiles.

### 2.2 Limitations of Existing Approaches
| Parameter | Informal WhatsApp Groups | Physical Notice Boards | Verbal Inquiries |
| :--- | :--- | :--- | :--- |
| **Searchability** | Poor (ephemeral chat stream) | None (manual reading) | None (dependent on shift guard memory) |
| **Fraud Prevention** | Extremely Low (photos exposed to everyone) | Low (anyone can read details) | Medium (informal interrogation) |
| **Audit Trail** | None | None | Paper register (often unmaintained) |
| **Cross-Matching** | Zero automated matching | Zero automated matching | Zero automated matching |
| **Data Privacy** | PII & ID cards leaked publicly | Sensitive cards exposed | Private |

### 2.3 Proposed CampusFind System
CampusFind addresses all systemic flaws of informal mechanisms:
- **Zero-Exposure Privacy Model**: Public thumbnail cards render specialized vector avatars matching the item type (e.g., wallet, laptop, backpack, bottle). Raw photos are stripped at the API payload layer, completely preventing unauthorized inspection.
- **Role-Based Clearance**: Administrators and vetted uploaders can inspect original images to verify unique serial numbers or concealed marks before authorizing property handover.
- **Rule-Based Heuristic Matching**: An automated scoring engine continuously scans reciprocal registries and surfaces candidates directly on item details pages.
- **Live CCTV Evidence Integration**: Surveillance desks can stream IP cameras, apply night-vision or contrast enhancement filters, capture evidence frames, and instantly generate pre-populated found reports.

---

## 3. System Requirements Specification

### 3.1 Functional Requirements
- **FR-01: User Account & Identity Management**: Authenticate users with email, password, and institutional PRN. Enforce Role-Based Access Control (RBAC).
- **FR-02: Lost Item Registration**: Allow registered users to record misplaced belongings with metadata (title, category, detailed description, location, date, contact, and optional image).
- **FR-03: Found Item Registration**: Allow community members to report items located across campus.
- **FR-04: Privacy Masking & Vector Avatars**: Display generic vector archetype avatars by default. Provide an authorized reveal toggle only for administrators and approved uploaders.
- **FR-05: Real-Time Heuristic Matching**: Automatically evaluate similarity between lost and found items and render a "Possible Matches" recommendation tray.
- **FR-06: Recovery Request Workflow**: Enable users to file recovery claims against items with explanatory notes and contact details. Allow admins to review, approve, or reject claims.
- **FR-07: Admin Uploader Management**: Permit administrators to search registered users and grant or revoke verified uploader privileges.
- **FR-08: CCTV & IP Webcam Stream Inspector**: Stream live RTSP/MJPEG/HTTP feeds from campus cameras or mobile IP webcam applications, with evidence capture tools.

### 3.2 Non-Functional Requirements
- **NFR-01: Security**: Passwords salted and hashed with `bcryptjs`. API endpoints secured with JSON Web Tokens (`jwt`). HTTP security headers enforced via `helmet`. API payload scrubbing guarantees that non-permitted viewers receive `imageData: null`.
- **NFR-02: Performance**: Initial page load bundle size < 550KB gzipped. Client-side routing and component mounting execute in < 100ms. Search and filter operations execute in < 20ms using client-side memoized indices.
- **NFR-03: Usability & Accessibility**: Built using responsive typography, WCAG AA color contrast (warm paper background `#fcfbf7`, dark ink text `#1e1e1e`, lost terracotta `#c85a32`, found forest green `#2d5a3f`), keyboard focus rings, and screen-reader ARIA tags.
- **NFR-04: Reliability & Data Integrity**: Foreign key constraints with cascading rules in PostgreSQL ensure referential consistency across users, reports, and recovery requests.

### 3.3 Hardware and Software Requirements
- **Client System**:
  - Operating System: Android, iOS, Windows 10/11, macOS, Linux.
  - Browser: Google Chrome 100+, Mozilla Firefox 100+, Safari 15+, Microsoft Edge 100+.
  - Display: Responsive viewport from 360px (mobile) to 4K Ultra HD.
- **Server System**:
  - Processor: 2.0 GHz Dual-Core 64-bit CPU or higher.
  - Memory: 2 GB RAM minimum (4 GB recommended).
  - Storage: 10 GB SSD storage.
  - Runtime: Node.js v20.18+ or v22 LTS.
  - Database: PostgreSQL 15+ (production) / In-memory state engine (development).

### 3.4 User Roles and Permissions
<img width="1692" height="300" alt="image" src="https://github.com/user-attachments/assets/69c1a475-f223-4ea2-9e4a-9747d136d4f1" />

---

## 4. System Design

### 4.1 System Architecture
CampusFind follows a decoupled, three-tier client-server architecture:
<img width="2281" height="1040" alt="image" src="https://github.com/user-attachments/assets/8e35d92c-9338-413c-97e0-0f1fa4aa53b8" />



### 4.2 Main User Workflow

<img width="1620" height="1234" alt="image" src="https://github.com/user-attachments/assets/d5ea3b38-dd64-40bc-8e2a-b86a7375eb9e" />


### 4.3 Use Case View
The primary use cases across user actors include:
- **Guest**: Browse Lost Items, Browse Found Items, Search by Keywords, Filter by Category/Date.
- **Student / User**: Sign In / Register with PRN, File Lost Item Report, File Found Item Report, View Own Reports, Reveal Photo on Personal Reports, File Recovery Request Claim.
- **Approved Uploader / Staff**: Inspect Original Photos across all items, Verify Claimant Identification, Log Found Belonging directly to Desk Registry.
- **Campus Security Administrator**: Grant / Revoke Uploader Permissions, Review & Moderate Recovery Requests, Monitor Live CCTV Feeds, Capture & Tag Evidence Snapshots, Delete Invalid Reports.

### 4.4 Database Design and Schema

<img width="725" height="1244" alt="image" src="https://github.com/user-attachments/assets/e0c57dcd-6ed2-49b2-823a-12c65cbb5ae4" />


### 4.5 Heuristic Possible-Match Logic

<img width="1462" height="827" alt="image" src="https://github.com/user-attachments/assets/4fcf0340-ff8d-4d3f-ac6c-d5c6d92186ce" />


### 4.6 Technology Stack
- **Frontend Core**: React 19, TypeScript, React Router DOM v7.
- **Styling & Assets**: Tailwind CSS v4, Lucide React iconography, custom SVG vector archetype library.
- **Build System**: Vite v8 with Rolldown native bundler.
- **Backend Application Server**: Node.js, Express.js.
- **Database Engine**: PostgreSQL 16 with Connection Pooling (`pg`).
- **Security Middleware**: `helmet`, `cors`, `bcryptjs`, `jsonwebtoken`, `express-rate-limit`.

### 4.7 Why the Stack Fits the Project
1. **React 19 & Vite 8**: Enables ultra-fast hot module replacement (< 50ms) and compile speeds (< 400ms), delivering instant responsive UI transitions for dynamic search and filtering.
2. **Tailwind CSS v4 Engine**: Eliminates runtime CSS overhead by using static compile-time generation, creating a unified campus brand aesthetic with zero CSS bloat.
3. **PostgreSQL Relational Integrity**: Essential for enforcing foreign keys, transactions, and audit histories across users, items, and handover recovery claims.
4. **Node.js Asynchronous I/O**: Ideal for handling concurrent live IP webcam MJPEG stream proxies and snapshot polls without blocking thread pools.

---

## 5. Implementation and Module Description

### 5.1 Authentication and Role-Based Access Control
- Uses JSON Web Tokens (`jwt`) signed with 256-bit encryption.
- Validates institutional identity: Requires institutional PRN formatting (e.g. `202201...`) and academic email structure (`@gcoec.ac.in`).
- Defines distinct privilege tiers: `admin`, `staff`, `student`, and `guest`.

### 5.2 Lost and Found Reports Management
- Dual dedicated entry pipelines for `/report-lost` and `/report-found`.
- Validates required title, category, description, campus location, date, and contact credentials.
- Handles image payload resizing on the client side using HTML Canvas, constraining uploads to a maximum 800px dimension and `< 200KB` payload footprint.

### 5.3 Search, Filtering, and Indexing
- High-efficiency client-side fuzzy search across item name, category, and department location.
- Multi-faceted filtering by category (`Electronics`, `Accessories`, `Books`, `Documents`, `Keys`, `Other`).
- Bidirectional sorting: Newest First versus Oldest First based on ISO timestamps.

### 5.4 Privacy-Preserving Generic Vector Archetypes
To satisfy the strict privacy and fraud prevention mandate:
- When a user views `/lost-items` or `/found-items`, the thumbnail displays a handcrafted, responsive SVG vector archetype of the actual item (e.g., leather wallet, scientific calculator, spiral notebook, USB flash drive).
- The archetype is dynamically resolved via `detectItemType()` in [`src/utils/itemAvatars.js`](file:///home/mihir/Downloads/AI%20Blog/CampusFind/src/utils/itemAvatars.js), evaluating titles and descriptions.
- **Access Controlled Reveal**:
  - Regular viewers see the vector avatar with a `Photo Protected` badge.
  - Authorized viewers (Campus Admin, Verified Uploader, or Item Owner) receive an interactive `Reveal Photo` toggle button directly on the card to inspect original photos.

### 5.5 Rule-Based Cross-Matching Engine
- Implemented in [`src/components/PossibleMatches.jsx`](file:///home/mihir/Downloads/AI%20Blog/CampusFind/src/components/PossibleMatches.jsx).
- Compares active item against the opposing registry in real time.
- Renders prospective matches with similarity badges and direct navigation links to contact the finder or claimant.

### 5.6 Recovery Requests and Custody Verification
- Formal claim submission pipeline preventing informal arguments.
- Claimants must submit a verification message detailing distinguishing features not listed publicly.
- Administrators review claims at `/recovery-requests`, verify identity, and mark status as `approved` or `rejected`.

### 5.7 Campus Security Live CCTV and IP Webcam Integration
- Live CCTV console located at `/cctv`.
- Supports multiple surveillance feeds:
  1. Local USB / Laptop Webcams.
  2. Mobile Android IP Webcams (via port 8080 HTTP/MJPEG).
  3. Pre-configured campus surveillance cameras (Canteen, Central Library 2nd Floor, Main Entrance turnstiles).
- Features visual inspection tools: HUD timestamp overlay, inspection grid, digital zoom, night vision simulation, and hi-contrast edge detection.
- **Evidence Tagging**: Security officers can click "Capture Evidence Frame" to grab a timestamped video snapshot and instantly convert it into a verified found report.

### 5.8 Administrator Functions and Uploader Approvals
- Dedicated **Approved Uploaders** modal accessible from the user account menu.
- Administrators can search campus personnel and toggle `isApprovedUploader`.
- Approved uploaders gain permission to inspect unmasked photos, enabling departmental desk staff to assist in returns without full administrative privileges.

### 5.9 Multi-Layered Security Measures
- **Network-Level Photo Masking**: `imageData` is set to `null` before sending payloads across HTTP to unauthorized clients.
- **Password Protection**: Passwords hashed with 10 salt rounds via `bcryptjs`.
- **Injection Defense**: Parameterized SQL queries throughout PostgreSQL controllers.
- **HTTP Hardening**: Content Security Policy, X-Frame-Options, and X-Content-Type-Options via `helmet`.

---

## 6. Results and System Testing

### 6.1 Testing Methodology
The application underwent a rigorous four-phase testing regimen:
1. **Component Unit Testing**: Validating vector archetype assignment, date formatting, and filter sorting.
2. **Integration Testing**: Verifying end-to-end API communication between React and Express.
3. **Role-Based Security Testing**: Testing access barriers for unauthenticated, student, staff, and admin accounts.
4. **Network Interception Testing**: Validating that non-authorized network requests contain zero raw image bytes in DevTools.

### 6.2 Recorded Automated Test Results
Our automated security and isolation test suite executed the following checks:

```
[TEST 1: Unauthenticated Viewer]
- GET /api/lost-items returned 6 items.
- Item "Black Leather Wallet": imageData = null, hasOriginalImage = true.
- Item "Blue College Backpack": imageData = null, hasOriginalImage = true.
-> PASS: Unauthorized network payloads contain zero image bytes.

[TEST 2: Regular Student Account]
- Logged in as student@gcoec.ac.in (isApprovedUploader = false).
- Inspected another user's lost backpack.
- Received imageData = null.
- Attempted GET /api/admin/users -> 403 Forbidden.
-> PASS: Student isolation and admin endpoint restrictions enforced.

[TEST 3: Campus Security Admin Account]
- Logged in as admin@gcoec.ac.in (isAdmin = true).
- Inspected items -> Received unmasked base64/URI image data.
- Accessed /api/admin/users -> Retrieved user list.
- Toggled student uploader status via PATCH /api/admin/users/2/approve-uploader.
-> PASS: Administrative privileges and approval operations confirmed.

[TEST 4: Newly Approved Uploader]
- Re-queried item registry as student (isApprovedUploader = true).
- Received unmasked original photo.
-> PASS: Dynamic permission escalation verified immediately.

[TEST 5: Pre-Approved Desk Staff Account]
- Logged in as staff@gcoec.ac.in (isApprovedUploader = true).
- Inspected found items -> Received unmasked photos and reveal controls.
-> PASS: Multi-role desk staff verification successful.
```

### 6.3 Representative Test Cases

| Test ID | Module | Precondition | Input / Action | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Auth | Unregistered user | Register with invalid PRN format (`abc12`) | Form blocks submission with PRN validation error | **PASS** |
| **TC-02** | Auth | Registered user | Login with correct credentials | JWT token returned; user session established | **PASS** |
| **TC-03** | Registry | Guest viewer | Navigate to `/lost-items` | Generic vector avatars rendered; original photos hidden | **PASS** |
| **TC-04** | Privacy | Guest viewer | Inspect Network tab payload for item image | `imageData: null`, `hasOriginalImage: true` | **PASS** |
| **TC-05** | Privacy | Admin logged in | Click "Reveal Photo" button on item card | Vector avatar toggles seamlessly to authentic photo | **PASS** |
| **TC-06** | Reports | Logged-in user | Submit lost report without category | Validation highlights category dropdown as required | **PASS** |
| **TC-07** | Matching | Logged-in user | View detail of lost wallet reported at Canteen | Suggests found wallet logged at Canteen with > 70% score | **PASS** |
| **TC-08** | Claims | Owner logged in | Submit recovery claim on matching found item | Claim created in `pending` state; visible on Admin panel | **PASS** |
| **TC-09** | Admin | Admin logged in | Grant approved uploader status to student | Target user's `isApprovedUploader` sets to `true` | **PASS** |
| **TC-10** | CCTV | Security staff | Click "Capture Evidence Frame" on live feed | Canvas freezes frame and launches pre-filled found report | **PASS** |

### 6.4 Deployment Details
- **Production Server**: Linux POSIX environment (Ubuntu 22.04 LTS / Arch Linux).
- **Process Supervision**: Systemd / PM2 running Node.js service on port 3000.
- **Reverse Proxy**: Nginx handling SSL/TLS termination, HTTP/2 multiplexing, and static asset caching.
- **Database Engine**: PostgreSQL managed instance with daily automated backups.

---

## 7. Conclusion, Future Scope, References

### 7.1 Limitations of the Implemented System
- CCTV stream integration relies on local network accessible IP streams or WebRTC feeds; campuses with strict VLAN isolation require internal network routing.
- Heuristic matching uses tokenized text similarity; highly misspelled item names may reduce match confidence.

### 7.2 Future Scope
- **Multimodal AI Visual Matching**: Implementing CLIP (Contrastive Language-Image Pre-training) models to compute visual embeddings between CCTV frames and lost item photos.
- **Automated WhatsApp / Telegram Gateway**: Implementing an official verified webhook bot allowing students to submit lost reports via messaging apps.
- **Automated Smart Lockers**: Integrating physical IoT lockers at security posts with OTP-based claimant retrieval.
- **Automated RFID / BLE Beacon Tracking**: Supporting campus student cards equipped with RFID tags for near-field discovery.

### 7.3 Conclusion
CampusFind demonstrates that campus lost-and-found management can be transformed from a chaotic, insecure social media stream into a structured, privacy-preserving institutional service. By combining **generic vector archetypes**, **network-level photo masking**, **automated heuristic matching**, and **live CCTV integration**, the platform ensures that personal items are identified accurately and returned safely to their genuine owners.

### 7.4 References
1. React Documentation: Declarative UI Components and Hooks. [https://react.dev/](https://react.dev/)
2. Vite Next Generation Frontend Tooling. [https://vite.dev/](https://vite.dev/)
3. PostgreSQL 16 Official Manual: Transaction Isolation and Indexing. [https://www.postgresql.org/docs/16/](https://www.postgresql.org/docs/16/)
4. Express.js: Fast, Unopinionated Web Framework for Node.js. [https://expressjs.com/](https://expressjs.com/)
5. Tailwind CSS v4 Engine Architecture. [https://tailwindcss.com/](https://tailwindcss.com/)
6. NIST Special Publication 800-162: Guide to Attribute Based Access Control (ABAC) Definition and Consideration. National Institute of Standards and Technology.

---

## 8. Appendix: System Screenshots

The following screenshots illustrate the core operational views of the CampusFind system running on the GCOEC campus deployment:

### Figure A.1: Lost Items Registry Interface
![Lost Items Registry Interface](IMGs/WhatsApp%20Image%202026-10-21%20at%2010.54.39%20PM.jpeg)
*The public Lost Items Registry (`/lost-items`) featuring real-time keyword search, departmental category selectors, sorting filters, and protected card listings with generic archetype vector avatars.*

---

### Figure A.2: Report a Lost Belonging Form
![Report a Lost Belonging Form](IMGs/WhatsApp%20Image%202026-10-21%20at%2010.55.38%20PM.jpeg)
*Structured lost item reporting interface (`/report-lost`) incorporating mandatory attribute validation, location tagging, date pickers, and security guidance for claimants.*

---

### Figure A.3: Found Items Registry Interface
![Found Items Registry Interface](IMGs/WhatsApp%20Image%202026-10-21%20at%2010.56.02%20PM.jpeg)
*The public Found Items Registry (`/found-items`) displaying items turned in across campus laboratories, cafeterias, and academic blocks.*

---

### Figure A.4: Report a Found Belonging Form
![Report a Found Belonging Form](IMGs/WhatsApp%20Image%202026-10-21%20at%2010.56.21%20PM.jpeg)
*Turned-in item submission form (`/report-found`) guiding the finder on custody retention and secure handover protocols.*

---

### Figure A.5: Campus CCTV & IP Webcam Inspection Console
![Campus CCTV Inspection Console](IMGs/WhatsApp%20Image%202026-10-21%20at%2010.56.50%20PM.jpeg)
*Live surveillance console (`/cctv`) equipped with stream selector, inspection HUD overlay, night-vision and high-contrast filters, and evidence frame capture actions.*

---

### Figure A.6: Recovery Requests Workflow Management
![Recovery Requests Workflow](IMGs/WhatsApp%20Image%202026-10-21%20at%2011.00.59%20PM.jpeg)
*Dispute resolution and recovery requests management interface (`/recovery-requests`) where claims are tracked and moderated.*

---

### Figure A.7: User Activity & Reports Dashboard
![User Activity Dashboard](IMGs/WhatsApp%20Image%202026-10-21%20at%2011.01.33%20PM.jpeg)
*Personal user activity portal (`/my-reports`) summarizing all reports submitted by the authenticated student or faculty member.*

---
*CampusFind — Developed for Government College of Engineering, Chandrapur (GCOEC).*
