# P02 · Closing the Loop: Hostel Maintenance Transparency Platform

> **Domain:** Hostel life; digital student services  
> **Course Brief Code:** P02 · Closing the Loop — *Hostel Maintenance Complaints That Go Nowhere*

---

## 📌 Problem Statement & Context
A student reports a leaking tap, failed ceiling fan, or broken window latch and then hears nothing — **no status, no timeline, no confirmation** — so complaints get re-raised, escalated informally, or abandoned. 

Complaints flow through standard university systems or warden office registers, but the **feedback loop back to the student is broken**, while **technicians juggle unstructured job lists whose priorities and bottlenecks students never see**.

---

## 💡 The Design Challenge (HMW)
> *"How might we give hostellers visible, trustworthy progress on their maintenance complaints while respecting how technicians actually schedule work?"*

---

## 🚀 Key Features & Architectural Solutions

### 1. 🎓 Hosteller / Student Portal (`Arjun Patel · Room C-304`)
- **Fast 1-Minute Intake:** Select fixture category (Electrical, Plumbing, Carpentry, Pest, Civil), preferred inspection time slot (e.g. `14:00 - 16:00`), and urgency level.
- **Transparent Progress Stepper:** Live visual stages:
  `Filed & Queued` ➔ `Tech Assigned` ➔ `On Route / Slot` ➔ `Fix Underway` ➔ `Verify Closure` ➔ `Loop Closed`.
- **"No More Black Hole" Delay Transparency:** When parts are missing or delays occur, the tracker explicitly displays the reason (e.g. *"Waiting for 15mm Brass Tap Spindle from Central Store. Restock arriving tomorrow 10:00 AM"*).
- **Mutual Closure Verification with 4-Digit OTP:** Technicians **cannot** falsely mark complaints closed. Students inspect the work, view the uploaded photo proof, and enter their personal OTP (`7482`) along with a 1–5 star rating to close the loop.
- **SLA Countdown & 1-Click Warden Escalation:** Real-time SLA tracking with direct escalation to Warden Dr. Sharma if deadlines breach.

### 2. 🔧 Technician Field App (`Ramesh Kumar · Lead Electrician`)
> *"The technician is a user too."*
- **Proximity-Routed Job Cards:** Clustered by Block & Floor proximity (e.g. Block C Floor 3 jobs grouped together) eliminating unnecessary cross-campus transit.
- **1-Tap Field Status Triggers:**
  - `🚀 On the Way (10m ETA)`
  - `🔨 Start Work`
  - `📦 Log Missing Spare` (Selects part from store, automatically updates student's ETA)
  - `📸 Complete & Photo Proof` (Uploads repair photo and triggers OTP verification)
- **Central Store Live Inventory:** Direct view of spare parts availability (Capacitors, Tap Spindles, MCBs, Latches).

### 3. 🛡️ Warden & Admin HQ (`Dr. S. K. Sharma · Chief Warden`)
- **First-Time-Fix Rate (FTFR):** Tracks fix quality (`84.2%` vs. legacy paper register).
- **Recurrent Breakdown Detector:** Automatically flags repeat complaints in the same room/fixture within 14 days to recommend fixture replacement over temporary patching.
- **Root-Cause Bottleneck Analyzer:** Quantifies why complaints stall (45% Central Store stockout, 25% room locked, 20% power shutdown approval, 10% peak shift load).
- **Active Escalation Management:** Real-time queue with quick reassign and estate office priority overrides.

### 4. 🗺️ Research & Course Deliverables Hub
- **Comparative Journey Map:** Side-by-side walkthrough of the *Traditional Broken Flow* vs. the *Closing the Loop Flow*.
- **Empathy Maps & Personas:** Arjun Patel (Hosteller), Ramesh Kumar (Technician), Dr. S. K. Sharma (Warden).
- **Point of View (POV) & Idea Screening Matrix:** Implementation analysis of high-impact features.

---

## 🛠️ How to Run the App

### Option A: Instant Browser Launch (Zero-Setup)
You can directly open the standalone HTML application in your browser:
```
public/index.html
```
*(Right-click `public/index.html` ➔ "Open with" ➔ Chrome / Edge / Firefox)*.  
The application contains a built-in state engine with `localStorage` persistence and fallback data, so all interactive flows (filing, technician photo proof, OTP validation, Warden actions) work right in the browser!

### Option B: Local Python REST API Server (Standard Library)
Run the backend server (uses Python 3 standard library with SQLite, zero external pip packages needed):
```powershell
cd "C:\Users\Harsh Kumar\.gemini\antigravity\scratch\closing-the-loop"
python server.py
```
Then navigate in your browser to:
```
http://localhost:8000
```

### Option C: Run Database & Logic Tests
To verify database schemas, seed data integrity, and REST endpoints:
```powershell
python test_db.py
```

---

## 📂 Project Structure
```
closing-the-loop/
├── server.py              # Zero-dependency Python 3 HTTP + REST API Server & SQLite DB
├── test_db.py             # Database and seed data automated test suite
├── hostel_maintenance.db  # Relational SQLite database
├── public/
│   ├── index.html         # Responsive Single Page Application with Role Switcher
│   ├── app.js             # Interactive controller, state management, dual-mode engine
│   └── styles.css         # Custom styling, step trackers, toast animations
└── README.md              # Project documentation and syllabus mapping
```
