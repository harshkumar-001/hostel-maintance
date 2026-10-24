import sqlite3
import os
import datetime

# Test database and data functions directly
from server import init_db, seed_sample_data, get_db

def test_db():
    init_db()
    seed_sample_data(force=True)
    conn = get_db()
    c = conn.cursor()

    c.execute("SELECT COUNT(*) FROM complaints")
    comp_count = c.fetchone()[0]
    print(f"[PASS] Total complaints seeded: {comp_count}")
    assert comp_count == 6

    c.execute("SELECT COUNT(*) FROM technicians")
    tech_count = c.fetchone()[0]
    print(f"[PASS] Total technicians seeded: {tech_count}")
    assert tech_count == 4

    c.execute("SELECT COUNT(*) FROM inventory")
    inv_count = c.fetchone()[0]
    print(f"[PASS] Total inventory items seeded: {inv_count}")
    assert inv_count == 6

    c.execute("SELECT COUNT(*) FROM timeline_events")
    event_count = c.fetchone()[0]
    print(f"[PASS] Total timeline events: {event_count}")
    assert event_count > 0

    # Verify a resolved complaint with closure OTP
    c.execute("SELECT id, title, status, closure_otp, delay_reason FROM complaints WHERE id = 'CMP-8012'")
    comp = c.fetchone()
    print(f"[PASS] Checked CMP-8012: status={comp['status']}, otp={comp['closure_otp']}")
    assert comp['status'] == 'resolved'
    assert comp['closure_otp'] == '7482'

    # Verify delayed complaint with transparent delay reason
    c.execute("SELECT id, status, delay_reason FROM complaints WHERE id = 'CMP-8013'")
    comp2 = c.fetchone()
    print(f"[PASS] Checked CMP-8013: status={comp2['status']}, delay={comp2['delay_reason']}")
    assert comp2['status'] == 'waiting_parts'
    assert 'Brass Spindle' in comp2['delay_reason']

    conn.close()
    print("\nDATABASE LOGIC AND SEED DATA FULLY VERIFIED!")

if __name__ == '__main__':
    test_db()
