#!/usr/bin/env python3
"""
Closing the Loop - Hostel Maintenance Transparency Platform
Backend Server with SQLite Relational Store and RESTful APIs
Zero external dependencies required (Uses Python 3 Standard Library)
"""

import sys
import os
import json
import sqlite3
import random
import datetime
from urllib.parse import urlparse, parse_qs
from http.server import HTTPServer, SimpleHTTPRequestHandler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
DB_PATH = os.path.join(BASE_DIR, "hostel_maintenance.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    
    # Complaints table
    c.execute("""
    CREATE TABLE IF NOT EXISTS complaints (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        block TEXT NOT NULL,
        room TEXT NOT NULL,
        student_name TEXT NOT NULL,
        student_phone TEXT,
        student_roll TEXT,
        description TEXT,
        priority TEXT DEFAULT 'Routine',
        preferred_slot TEXT,
        status TEXT DEFAULT 'submitted',
        technician_id TEXT,
        technician_name TEXT,
        technician_phone TEXT,
        expected_window TEXT,
        eta_minutes INTEGER DEFAULT 60,
        is_escalated INTEGER DEFAULT 0,
        escalation_level INTEGER DEFAULT 0,
        escalation_reason TEXT,
        closure_otp TEXT,
        proof_image_url TEXT,
        resolution_notes TEXT,
        student_rating INTEGER DEFAULT 0,
        student_feedback TEXT,
        repeat_count INTEGER DEFAULT 0,
        delay_reason TEXT,
        delay_category TEXT,
        created_at TEXT,
        updated_at TEXT,
        sla_deadline TEXT
    )
    """)

    # Timeline events table
    c.execute("""
    CREATE TABLE IF NOT EXISTS timeline_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        complaint_id TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        author_role TEXT NOT NULL,
        author_name TEXT NOT NULL,
        event_type TEXT NOT NULL,
        message TEXT NOT NULL,
        details TEXT,
        FOREIGN KEY(complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
    )
    """)

    # Technicians table
    c.execute("""
    CREATE TABLE IF NOT EXISTS technicians (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        trade TEXT NOT NULL,
        phone TEXT,
        assigned_block TEXT,
        status TEXT DEFAULT 'Available',
        active_jobs INTEGER DEFAULT 0,
        completed_today INTEGER DEFAULT 0,
        rating REAL DEFAULT 4.8,
        avatar TEXT
    )
    """)

    # Spares inventory table
    c.execute("""
    CREATE TABLE IF NOT EXISTS inventory (
        id TEXT PRIMARY KEY,
        item_name TEXT NOT NULL,
        trade TEXT NOT NULL,
        stock_quantity INTEGER DEFAULT 0,
        status TEXT DEFAULT 'In Stock',
        eta_restock TEXT
    )
    """)

    conn.commit()
    conn.close()

def seed_sample_data(force=False):
    conn = get_db()
    c = conn.cursor()

    if not force:
        c.execute("SELECT COUNT(*) FROM complaints")
        if c.fetchone()[0] > 0:
            conn.close()
            return

    # Clear existing
    c.execute("DELETE FROM timeline_events")
    c.execute("DELETE FROM complaints")
    c.execute("DELETE FROM technicians")
    c.execute("DELETE FROM inventory")

    # Technicians
    technicians = [
        ("TECH-01", "Ramesh Kumar", "Electrical", "+91 98721 00112", "Block C & D", "On Job", 2, 4, 4.85, "RK"),
        ("TECH-02", "Suresh Yadav", "Plumbing", "+91 98721 00223", "Block A & B", "Available", 1, 3, 4.70, "SY"),
        ("TECH-03", "Jagdish Mistri", "Carpentry", "+91 98721 00334", "All Blocks", "On Job", 1, 2, 4.90, "JM"),
        ("TECH-04", "Santosh Rawat", "Pest Control & Civil", "+91 98721 00445", "All Blocks", "Available", 0, 5, 4.65, "SR")
    ]
    c.executemany("""
    INSERT INTO technicians (id, name, trade, phone, assigned_block, status, active_jobs, completed_today, rating, avatar)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, technicians)

    # Inventory
    inventory = [
        ("PART-01", "Ceiling Fan Capacitor 2.5uF", "Electrical", 6, "In Stock", "Immediate"),
        ("PART-02", "Brass Tap Spindle 15mm", "Plumbing", 2, "Low Stock", "Tomorrow 10:00 AM"),
        ("PART-03", "Door Latch Tower Bolt 6-inch", "Carpentry", 14, "In Stock", "Immediate"),
        ("PART-04", "LED Tube Light 20W 6500K", "Electrical", 18, "In Stock", "Immediate"),
        ("PART-05", "Flush Cistern Siphon Valve", "Plumbing", 0, "Out of Stock", "Arriving in 24 hrs"),
        ("PART-06", "Window Friction Stay Hinges", "Carpentry", 4, "Low Stock", "Tomorrow 2:00 PM")
    ]
    c.executemany("""
    INSERT INTO inventory (id, item_name, trade, stock_quantity, status, eta_restock)
    VALUES (?, ?, ?, ?, ?, ?)
    """, inventory)

    now = datetime.datetime.now()
    t_minus = lambda hours, mins=0: (now - datetime.timedelta(hours=hours, minutes=mins)).strftime("%Y-%m-%d %H:%M")
    t_plus = lambda hours, mins=0: (now + datetime.timedelta(hours=hours, minutes=mins)).strftime("%Y-%m-%d %H:%M")

    # Sample complaints showing full spectrum from image brief
    complaints = [
        # 1. Waiting for Student Closure OTP verification (with photo proof)
        {
            "id": "CMP-8012",
            "title": "Ceiling Fan Regulator Broken & Vibrating Noisily",
            "category": "Electrical",
            "block": "Block C",
            "room": "C-304",
            "student_name": "Arjun Patel",
            "student_phone": "+91 98201 11223",
            "student_roll": "2024CSB1044",
            "description": "The fan spins at maximum speed and hums violently. The knob is broken and cannot be turned down.",
            "priority": "High",
            "preferred_slot": "14:00 - 16:00",
            "status": "resolved",
            "technician_id": "TECH-01",
            "technician_name": "Ramesh Kumar",
            "technician_phone": "+91 98721 00112",
            "expected_window": "Today 15:00 - 17:00",
            "eta_minutes": 0,
            "is_escalated": 0,
            "escalation_level": 0,
            "closure_otp": "7482",
            "proof_image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "resolution_notes": "Replaced stepped regulator and lubricated fan bearing. Tested at levels 1 through 5. Smooth sound.",
            "repeat_count": 1,
            "delay_reason": None,
            "created_at": t_minus(4, 30),
            "updated_at": t_minus(0, 15),
            "sla_deadline": t_plus(19, 30)
        },
        # 2. Transparent delay: Waiting on spare parts
        {
            "id": "CMP-8013",
            "title": "Continuous Tap Dripping in Bathroom Basin",
            "category": "Plumbing",
            "block": "Block A",
            "room": "A-112",
            "student_name": "Kavya Menon",
            "student_phone": "+91 98334 55667",
            "student_roll": "2023ECB2019",
            "description": "Tap has a fast drip that doesn't shut even when closed tight. Waste of water and annoying noise all night.",
            "priority": "Routine",
            "preferred_slot": "Anytime",
            "status": "waiting_parts",
            "technician_id": "TECH-02",
            "technician_name": "Suresh Yadav",
            "technician_phone": "+91 98721 00223",
            "expected_window": "Tomorrow 10:30 AM",
            "eta_minutes": 180,
            "is_escalated": 0,
            "escalation_level": 0,
            "closure_otp": "3914",
            "proof_image_url": None,
            "resolution_notes": "Inspected at 11:20 AM. Internal ceramic washer thread stripped. Ordered 15mm brass spindle from central store.",
            "repeat_count": 0,
            "delay_reason": "Awaiting Brass Spindle 15mm from Central Store (Restock batch arriving tomorrow morning)",
            "delay_category": "Awaiting Spare Parts",
            "created_at": t_minus(8, 0),
            "updated_at": t_minus(2, 10),
            "sla_deadline": t_plus(16, 0)
        },
        # 3. Escalated ticket: Geyser water heater sparking / tripping MCB
        {
            "id": "CMP-8014",
            "title": "Geyser Tripping Corridor MCB with Burning Smell",
            "category": "Electrical",
            "block": "Block B",
            "room": "B-218",
            "student_name": "Rohan Deshmukh",
            "student_phone": "+91 98450 77889",
            "student_roll": "2024MEB3092",
            "description": "As soon as geyser switch is pressed, sparks flickered in switchboard and corridor power tripped. Immediate hazard.",
            "priority": "Critical Hazard",
            "preferred_slot": "Emergency / Immediate",
            "status": "escalated",
            "technician_id": "TECH-01",
            "technician_name": "Ramesh Kumar",
            "technician_phone": "+91 98721 00112",
            "expected_window": "Immediate - Within 60 mins",
            "eta_minutes": 25,
            "is_escalated": 1,
            "escalation_level": 1,
            "escalation_reason": "SLA breach on Critical Hazard: Electrical fault unresolved over 14 hrs. Auto-escalated to Warden.",
            "closure_otp": "6109",
            "proof_image_url": None,
            "resolution_notes": None,
            "repeat_count": 2,
            "delay_reason": "Main distribution box diagnosis in progress. Requires campus estate officer approval for power shut down.",
            "delay_category": "Supervisor Approval Required",
            "created_at": t_minus(16, 0),
            "updated_at": t_minus(1, 0),
            "sla_deadline": t_minus(2, 0)
        },
        # 4. In progress: Window latch broken
        {
            "id": "CMP-8015",
            "title": "Window Pane Latch Broken - Rattles in High Wind",
            "category": "Carpentry",
            "block": "Block C",
            "room": "C-309",
            "student_name": "Tanmay Varma",
            "student_phone": "+91 98660 33441",
            "student_roll": "2024CVB4012",
            "description": "Left window hinge screws came off. Rainwater enters if wind blows.",
            "priority": "Routine",
            "preferred_slot": "16:00 - 18:00",
            "status": "in_progress",
            "technician_id": "TECH-03",
            "technician_name": "Jagdish Mistri",
            "technician_phone": "+91 98721 00334",
            "expected_window": "Today 16:30 - 17:30",
            "eta_minutes": 15,
            "is_escalated": 0,
            "escalation_level": 0,
            "closure_otp": "8521",
            "proof_image_url": None,
            "resolution_notes": "Carrying replacement stay hinges and wooden plugs. Work currently underway in C-309.",
            "repeat_count": 0,
            "delay_reason": None,
            "created_at": t_minus(3, 10),
            "updated_at": t_minus(0, 30),
            "sla_deadline": t_plus(20, 50)
        },
        # 5. Newly filed / submitted
        {
            "id": "CMP-8016",
            "title": "LAN Port Not Giving Connection & RJ-45 Clip Stuck",
            "category": "Electrical",
            "block": "Block D",
            "room": "D-402",
            "student_name": "Neha Sharma",
            "student_phone": "+91 98112 99001",
            "student_roll": "2023ITB1088",
            "description": "Ethernet faceplate port pins appear bent, cannot connect internet cable for semester exams project.",
            "priority": "High",
            "preferred_slot": "Morning (09:00 - 12:00)",
            "status": "submitted",
            "technician_id": None,
            "technician_name": None,
            "technician_phone": None,
            "expected_window": "Assignment pending (Avg 45 mins)",
            "eta_minutes": 90,
            "is_escalated": 0,
            "escalation_level": 0,
            "closure_otp": "4217",
            "proof_image_url": None,
            "resolution_notes": None,
            "repeat_count": 0,
            "delay_reason": None,
            "created_at": t_minus(0, 25),
            "updated_at": t_minus(0, 25),
            "sla_deadline": t_plus(23, 35)
        },
        # 6. Past successfully closed & verified ticket
        {
            "id": "CMP-8010",
            "title": "Tube Light Starter Flickering and Humming",
            "category": "Electrical",
            "block": "Block A",
            "room": "A-205",
            "student_name": "Devansh Gupta",
            "student_phone": "+91 98991 22334",
            "student_roll": "2022CSB1002",
            "description": "Main desk tubelight blinks constantly, makes study impossible.",
            "priority": "Routine",
            "preferred_slot": "Anytime",
            "status": "verified_closed",
            "technician_id": "TECH-01",
            "technician_name": "Ramesh Kumar",
            "technician_phone": "+91 98721 00112",
            "expected_window": "Completed",
            "eta_minutes": 0,
            "is_escalated": 0,
            "escalation_level": 0,
            "closure_otp": "9021",
            "proof_image_url": "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=600&q=80",
            "resolution_notes": "Replaced faulty electronic choke with 20W LED fixture. Tested illuminance.",
            "student_rating": 5,
            "student_feedback": "Technician Ramesh came on time, fixed it in 15 mins, and showed photo before asking for OTP. Super transparent!",
            "repeat_count": 0,
            "delay_reason": None,
            "created_at": t_minus(28, 0),
            "updated_at": t_minus(22, 0),
            "sla_deadline": t_minus(4, 0)
        }
    ]

    for comp in complaints:
        c.execute("""
        INSERT INTO complaints (
            id, title, category, block, room, student_name, student_phone, student_roll,
            description, priority, preferred_slot, status, technician_id, technician_name,
            technician_phone, expected_window, eta_minutes, is_escalated, escalation_level,
            escalation_reason, closure_otp, proof_image_url, resolution_notes, student_rating,
            student_feedback, repeat_count, delay_reason, delay_category, created_at, updated_at, sla_deadline
        ) VALUES (
            :id, :title, :category, :block, :room, :student_name, :student_phone, :student_roll,
            :description, :priority, :preferred_slot, :status, :technician_id, :technician_name,
            :technician_phone, :expected_window, :eta_minutes, :is_escalated, :escalation_level,
            :escalation_reason, :closure_otp, :proof_image_url, :resolution_notes, :student_rating,
            :student_feedback, :repeat_count, :delay_reason, :delay_category, :created_at, :updated_at, :sla_deadline
        )
        """, {
            "id": comp["id"], "title": comp["title"], "category": comp["category"],
            "block": comp["block"], "room": comp["room"], "student_name": comp["student_name"],
            "student_phone": comp["student_phone"], "student_roll": comp["student_roll"],
            "description": comp["description"], "priority": comp["priority"],
            "preferred_slot": comp["preferred_slot"], "status": comp["status"],
            "technician_id": comp.get("technician_id"), "technician_name": comp.get("technician_name"),
            "technician_phone": comp.get("technician_phone"), "expected_window": comp["expected_window"],
            "eta_minutes": comp["eta_minutes"], "is_escalated": comp["is_escalated"],
            "escalation_level": comp["escalation_level"], "escalation_reason": comp.get("escalation_reason"),
            "closure_otp": comp["closure_otp"], "proof_image_url": comp.get("proof_image_url"),
            "resolution_notes": comp.get("resolution_notes"), "student_rating": comp.get("student_rating", 0),
            "student_feedback": comp.get("student_feedback"), "repeat_count": comp["repeat_count"],
            "delay_reason": comp.get("delay_reason"), "delay_category": comp.get("delay_category"),
            "created_at": comp["created_at"], "updated_at": comp["updated_at"], "sla_deadline": comp["sla_deadline"]
        })

    # Sample timeline events
    events = [
        ("CMP-8012", t_minus(4, 30), "Student", "Arjun Patel", "SUBMITTED", "Complaint filed via mobile portal with preferred slot 14:00 - 16:00.", "Initial filing"),
        ("CMP-8012", t_minus(3, 45), "System", "Auto-Dispatcher", "ASSIGNED", "Assigned to Ramesh Kumar (Lead Electrician on Block C rounds).", "Proximity match: Block C Floor 3"),
        ("CMP-8012", t_minus(1, 45), "Technician", "Ramesh Kumar", "IN_TRANSIT", "Technician marked On the Way to Block C Room 304.", "Estimated arrival: 10 mins"),
        ("CMP-8012", t_minus(1, 20), "Technician", "Ramesh Kumar", "IN_PROGRESS", "Work started. Disassembled switch panel & testing capacitor resistance.", "Diagnostics clear"),
        ("CMP-8012", t_minus(0, 15), "Technician", "Ramesh Kumar", "RESOLVED_PENDING_OTP", "Technician finished work and uploaded photo proof. Closure OTP requested from student Arjun Patel.", "Pending student sign-off"),

        ("CMP-8013", t_minus(8, 0), "Student", "Kavya Menon", "SUBMITTED", "Complaint filed: Basin tap dripping continuously.", "Initial filing"),
        ("CMP-8013", t_minus(6, 30), "Technician", "Suresh Yadav", "ASSIGNED", "Assigned to Suresh Yadav (Plumber).", "Assigned"),
        ("CMP-8013", t_minus(2, 10), "Technician", "Suresh Yadav", "WAITING_PARTS", "Inspection completed. Ceramic spindle required. Part requested from Central Store.", "Delay explained to student: Awaiting parts restock"),

        ("CMP-8014", t_minus(16, 0), "Student", "Rohan Deshmukh", "SUBMITTED", "CRITICAL HAZARD: Geyser sparks and MCB tripped.", "High priority"),
        ("CMP-8014", t_minus(1, 0), "System", "SLA Monitor", "ESCALATED", "SLA breached (>14h without fix on Critical Hazard). Escalated to Hostel Warden Dr. Sharma.", "Warden alert triggered"),

        ("CMP-8015", t_minus(3, 10), "Student", "Tanmay Varma", "SUBMITTED", "Window hinge loose and rattling.", "Initial filing"),
        ("CMP-8015", t_minus(2, 0), "Technician", "Jagdish Mistri", "ASSIGNED", "Assigned to Jagdish Mistri (Carpenter).", "Assigned"),
        ("CMP-8015", t_minus(0, 30), "Technician", "Jagdish Mistri", "IN_PROGRESS", "Work started. Aligning friction hinges with new anchor plugs.", "Underway")
    ]

    for ev in events:
        c.execute("""
        INSERT INTO timeline_events (complaint_id, timestamp, author_role, author_name, event_type, message, details)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, ev)

    conn.commit()
    conn.close()

class HostelApiHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data, default=str).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        url = urlparse(self.path)
        path = url.path
        query = parse_qs(url.query)

        if path == "/api/complaints":
            conn = get_db()
            c = conn.cursor()
            
            sql = "SELECT * FROM complaints WHERE 1=1"
            params = []

            if "status" in query and query["status"][0]:
                sql += " AND status = ?"
                params.append(query["status"][0])
            if "category" in query and query["category"][0]:
                sql += " AND category = ?"
                params.append(query["category"][0])
            if "block" in query and query["block"][0]:
                sql += " AND block = ?"
                params.append(query["block"][0])
            if "technician_id" in query and query["technician_id"][0]:
                sql += " AND technician_id = ?"
                params.append(query["technician_id"][0])
            if "search" in query and query["search"][0]:
                term = f"%{query['search'][0]}%"
                sql += " AND (title LIKE ? OR room LIKE ? OR student_name LIKE ? OR id LIKE ?)"
                params.extend([term, term, term, term])

            sql += " ORDER BY CASE priority WHEN 'Critical Hazard' THEN 1 WHEN 'High' THEN 2 ELSE 3 END, created_at DESC"
            c.execute(sql, params)
            rows = [dict(r) for r in c.fetchall()]
            conn.close()
            return self._send_json({"complaints": rows, "count": len(rows)})

        elif path.startswith("/api/complaints/"):
            parts = path.split("/")
            if len(parts) >= 3 and parts[2]:
                comp_id = parts[2]
                conn = get_db()
                c = conn.cursor()
                c.execute("SELECT * FROM complaints WHERE id = ?", (comp_id,))
                row = c.fetchone()
                if not row:
                    conn.close()
                    return self._send_json({"error": "Complaint not found"}, status=404)
                
                complaint = dict(row)
                c.execute("SELECT * FROM timeline_events WHERE complaint_id = ? ORDER BY id ASC", (comp_id,))
                complaint["timeline"] = [dict(r) for r in c.fetchall()]
                conn.close()
                return self._send_json({"complaint": complaint})

        elif path == "/api/technicians":
            conn = get_db()
            c = conn.cursor()
            c.execute("SELECT * FROM technicians ORDER BY name ASC")
            techs = [dict(r) for r in c.fetchall()]
            conn.close()
            return self._send_json({"technicians": techs})

        elif path == "/api/inventory":
            conn = get_db()
            c = conn.cursor()
            c.execute("SELECT * FROM inventory ORDER BY trade ASC, item_name ASC")
            items = [dict(r) for r in c.fetchall()]
            conn.close()
            return self._send_json({"inventory": items})

        elif path == "/api/analytics":
            conn = get_db()
            c = conn.cursor()

            # Status breakdown
            c.execute("SELECT status, COUNT(*) as cnt FROM complaints GROUP BY status")
            status_dist = {r["status"]: r["cnt"] for r in c.fetchall()}

            # Block breakdown
            c.execute("SELECT block, COUNT(*) as cnt FROM complaints GROUP BY block")
            block_dist = {r["block"]: r["cnt"] for r in c.fetchall()}

            # Category breakdown
            c.execute("SELECT category, COUNT(*) as cnt FROM complaints GROUP BY category")
            category_dist = {r["category"]: r["cnt"] for r in c.fetchall()}

            # Total & closed
            c.execute("SELECT COUNT(*) FROM complaints")
            total = c.fetchone()[0]
            
            c.execute("SELECT COUNT(*) FROM complaints WHERE status = 'verified_closed'")
            verified_closed = c.fetchone()[0]

            c.execute("SELECT COUNT(*) FROM complaints WHERE is_escalated = 1")
            escalated_count = c.fetchone()[0]

            c.execute("SELECT COUNT(*) FROM complaints WHERE repeat_count > 0")
            repeat_count = c.fetchone()[0]

            # Average rating
            c.execute("SELECT AVG(student_rating) FROM complaints WHERE student_rating > 0")
            avg_rating = c.fetchone()[0] or 4.8

            # Delay causes
            c.execute("SELECT delay_category, COUNT(*) as cnt FROM complaints WHERE delay_category IS NOT NULL GROUP BY delay_category")
            delay_causes = {r["delay_category"]: r["cnt"] for r in c.fetchall()}

            conn.close()
            return self._send_json({
                "total": total,
                "verified_closed": verified_closed,
                "escalated_count": escalated_count,
                "repeat_complaints": repeat_count,
                "avg_rating": round(avg_rating, 2),
                "first_time_fix_rate": "84.2%",
                "status_distribution": status_dist,
                "block_distribution": block_dist,
                "category_distribution": category_dist,
                "delay_causes": delay_causes
            })

        # Static assets fallback
        return super().do_GET()

    def do_POST(self):
        url = urlparse(self.path)
        path = url.path
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length) if length > 0 else b'{}'
        try:
            data = json.loads(body.decode('utf-8'))
        except Exception:
            data = {}

        if path == "/api/complaints":
            # Student files new complaint
            conn = get_db()
            c = conn.cursor()

            # Generate ID
            new_id = f"CMP-{random.randint(8100, 8999)}"
            now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
            otp = f"{random.randint(1000, 9999)}"

            title = data.get("title", "Untitled Maintenance Issue")
            category = data.get("category", "General")
            block = data.get("block", "Block C")
            room = data.get("room", "C-101")
            student_name = data.get("student_name", "Hosteller")
            student_phone = data.get("student_phone", "+91 90000 00000")
            student_roll = data.get("student_roll", "2024GEN001")
            description = data.get("description", "")
            priority = data.get("priority", "Routine")
            preferred_slot = data.get("preferred_slot", "Anytime")

            # Check for repeat complaints in this room within recent tickets
            c.execute("SELECT COUNT(*) FROM complaints WHERE room = ? AND category = ?", (room, category))
            past_count = c.fetchone()[0]

            # Smart technician auto-assignment based on trade
            c.execute("SELECT id, name, phone FROM technicians WHERE trade LIKE ? ORDER BY active_jobs ASC LIMIT 1", (f"%{category}%",))
            assigned_tech = c.fetchone()

            tech_id = assigned_tech["id"] if assigned_tech else "TECH-01"
            tech_name = assigned_tech["name"] if assigned_tech else "Ramesh Kumar"
            tech_phone = assigned_tech["phone"] if assigned_tech else "+91 98721 00112"

            expected_window = "Today 16:00 - 18:00" if priority != "Critical Hazard" else "Immediate - Within 60 mins"
            deadline = (datetime.datetime.now() + datetime.timedelta(hours=24 if priority != "Critical Hazard" else 4)).strftime("%Y-%m-%d %H:%M")

            c.execute("""
            INSERT INTO complaints (
                id, title, category, block, room, student_name, student_phone, student_roll,
                description, priority, preferred_slot, status, technician_id, technician_name,
                technician_phone, expected_window, eta_minutes, is_escalated, escalation_level,
                closure_otp, repeat_count, created_at, updated_at, sla_deadline
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'assigned', ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?, ?)
            """, (
                new_id, title, category, block, room, student_name, student_phone, student_roll,
                description, priority, preferred_slot, tech_id, tech_name, tech_phone,
                expected_window, 45, otp, past_count, now_str, now_str, deadline
            ))

            # Update tech workload
            c.execute("UPDATE technicians SET active_jobs = active_jobs + 1 WHERE id = ?", (tech_id,))

            # Add timeline events
            c.execute("""
            INSERT INTO timeline_events (complaint_id, timestamp, author_role, author_name, event_type, message, details)
            VALUES (?, ?, 'Student', ?, 'SUBMITTED', 'Complaint registered via LoopHostel portal.', ?)
            """, (new_id, now_str, student_name, f"Slot preference: {preferred_slot}"))

            c.execute("""
            INSERT INTO timeline_events (complaint_id, timestamp, author_role, author_name, event_type, message, details)
            VALUES (?, ?, 'System', 'Smart Dispatcher', 'ASSIGNED', ?, ?)
            """, (new_id, now_str, f"Assigned to {tech_name} ({category}). Expected window: {expected_window}", f"Technician contact: {tech_phone}"))

            conn.commit()
            conn.close()

            return self._send_json({"success": True, "complaint_id": new_id, "closure_otp": otp}, status=201)

        elif path.endswith("/status"):
            # Update status
            parts = path.split("/")
            comp_id = parts[2]
            new_status = data.get("status")
            author_role = data.get("role", "Technician")
            author_name = data.get("author", "Technician")
            delay_reason = data.get("delay_reason")
            delay_category = data.get("delay_category")
            notes = data.get("notes", "")

            conn = get_db()
            c = conn.cursor()
            now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

            c.execute("""
            UPDATE complaints SET status = ?, delay_reason = ?, delay_category = ?, updated_at = ? WHERE id = ?
            """, (new_status, delay_reason, delay_category, now_str, comp_id))

            msg = f"Status updated to {new_status.replace('_', ' ').title()}."
            if delay_reason:
                msg += f" Delay note: {delay_reason}"
            if notes:
                msg += f" ({notes})"

            c.execute("""
            INSERT INTO timeline_events (complaint_id, timestamp, author_role, author_name, event_type, message, details)
            VALUES (?, ?, ?, ?, 'STATUS_UPDATE', ?, ?)
            """, (comp_id, now_str, author_role, author_name, msg, delay_category or ""))

            conn.commit()
            conn.close()
            return self._send_json({"success": True, "status": new_status})

        elif path.endswith("/proof"):
            # Technician uploads proof and marks resolved (triggering student OTP review)
            parts = path.split("/")
            comp_id = parts[2]
            image_url = data.get("image_url", "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80")
            notes = data.get("resolution_notes", "Work completed and tested.")
            tech_name = data.get("technician_name", "Technician")

            conn = get_db()
            c = conn.cursor()
            now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

            c.execute("""
            UPDATE complaints 
            SET status = 'resolved', proof_image_url = ?, resolution_notes = ?, updated_at = ?
            WHERE id = ?
            """, (image_url, notes, now_str, comp_id))

            c.execute("""
            INSERT INTO timeline_events (complaint_id, timestamp, author_role, author_name, event_type, message, details)
            VALUES (?, ?, 'Technician', ?, 'RESOLVED_PENDING_OTP', 'Technician uploaded resolution proof. Awaiting Student OTP verification.', ?)
            """, (comp_id, now_str, tech_name, notes))

            conn.commit()
            conn.close()
            return self._send_json({"success": True, "message": "Photo proof uploaded. Student notified for OTP verification."})

        elif path.endswith("/verify"):
            # Student verifies closure with 4-digit OTP
            parts = path.split("/")
            comp_id = parts[2]
            entered_otp = str(data.get("otp", "")).strip()
            rating = int(data.get("rating", 5))
            feedback = data.get("feedback", "Issue fixed properly.")

            conn = get_db()
            c = conn.cursor()
            c.execute("SELECT closure_otp, technician_id FROM complaints WHERE id = ?", (comp_id,))
            row = c.fetchone()
            if not row:
                conn.close()
                return self._send_json({"error": "Complaint not found"}, status=404)

            actual_otp = str(row["closure_otp"]).strip()
            if entered_otp != actual_otp:
                conn.close()
                return self._send_json({"error": f"Invalid OTP entered. Please check the 4-digit code in your student tracker."}, status=400)

            now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
            c.execute("""
            UPDATE complaints 
            SET status = 'verified_closed', student_rating = ?, student_feedback = ?, updated_at = ?
            WHERE id = ?
            """, (rating, feedback, now_str, comp_id))

            # Update tech completed count
            if row["technician_id"]:
                c.execute("UPDATE technicians SET active_jobs = MAX(0, active_jobs - 1), completed_today = completed_today + 1 WHERE id = ?", (row["technician_id"],))

            c.execute("""
            INSERT INTO timeline_events (complaint_id, timestamp, author_role, author_name, event_type, message, details)
            VALUES (?, ?, 'Student', 'Resident Verified', 'VERIFIED_CLOSED', ?, ?)
            """, (comp_id, now_str, f"Student confirmed fix with OTP. Rated: {rating}/5 stars.", feedback))

            conn.commit()
            conn.close()
            return self._send_json({"success": True, "message": "Loop closed! Ticket verified and archived."})

        elif path.endswith("/escalate"):
            # Escalate ticket to Warden or Admin
            parts = path.split("/")
            comp_id = parts[2]
            reason = data.get("reason", "No progress within expected SLA window.")
            role = data.get("role", "Student")
            author = data.get("author", "Hosteller")

            conn = get_db()
            c = conn.cursor()
            now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

            c.execute("""
            UPDATE complaints 
            SET status = 'escalated', is_escalated = 1, escalation_level = escalation_level + 1, escalation_reason = ?, updated_at = ?
            WHERE id = ?
            """, (reason, now_str, comp_id))

            c.execute("""
            INSERT INTO timeline_events (complaint_id, timestamp, author_role, author_name, event_type, message, details)
            VALUES (?, ?, ?, ?, 'ESCALATED', ?, ?)
            """, (comp_id, now_str, role, author, f"ESCALATED TO WARDEN: {reason}", "Priority elevated to immediate oversight"))

            conn.commit()
            conn.close()
            return self._send_json({"success": True, "message": "Complaint successfully escalated to Hostel Warden office."})

        elif path == "/api/reset-seed":
            seed_sample_data(force=True)
            return self._send_json({"success": True, "message": "Demo data reset successfully."})

        return self._send_json({"error": "Unknown POST route"}, status=404)

def run_server(port=8000):
    init_db()
    seed_sample_data()
    server_address = ('', port)
    httpd = HTTPServer(server_address, HostelApiHandler)
    print(f"LoopHostel Server running at http://localhost:{port}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        httpd.server_close()

if __name__ == "__main__":
    port = 8000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    run_server(port)
