/**
 * Closing the Loop · Hostel Maintenance Transparency Platform
 * Frontend Interactive Controller
 * Dual-Mode: Seamlessly connects to Python REST API or operates in standalone browser mode
 */

// Default Seed Data for Standalone/Client-Side Fallback
const DEFAULT_SEED_DATA = {
  complaints: [
    {
      id: "CMP-8012",
      title: "Ceiling Fan Regulator Broken & Vibrating Noisily",
      category: "Electrical",
      block: "Block C",
      room: "C-304",
      student_name: "Arjun Patel",
      student_phone: "+91 98201 11223",
      student_roll: "2024CSB1044",
      description: "The fan spins at maximum speed and hums violently. The knob is broken and cannot be turned down.",
      priority: "High",
      preferred_slot: "14:00 - 16:00",
      status: "resolved",
      technician_id: "TECH-01",
      technician_name: "Ramesh Kumar",
      technician_phone: "+91 98721 00112",
      expected_window: "Today 15:00 - 17:00",
      eta_minutes: 0,
      is_escalated: 0,
      escalation_level: 0,
      closure_otp: "7482",
      proof_image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      resolution_notes: "Replaced stepped regulator and lubricated fan bearing. Tested at levels 1 through 5. Smooth sound.",
      repeat_count: 1,
      delay_reason: null,
      created_at: "Today 10:30 AM",
      updated_at: "Today 02:45 PM",
      sla_deadline: "Tomorrow 10:30 AM",
      student_rating: 0,
      student_feedback: null,
      timeline: [
        { timestamp: "10:30 AM", author_role: "Student", author_name: "Arjun Patel", message: "Complaint filed via mobile portal with preferred slot 14:00 - 16:00.", details: "Initial filing" },
        { timestamp: "11:15 AM", author_role: "System", author_name: "Auto-Dispatcher", message: "Assigned to Ramesh Kumar (Lead Electrician on Block C rounds).", details: "Proximity match: Block C Floor 3" },
        { timestamp: "02:15 PM", author_role: "Technician", author_name: "Ramesh Kumar", message: "Technician marked On the Way to Block C Room 304.", details: "Estimated arrival: 10 mins" },
        { timestamp: "02:30 PM", author_role: "Technician", author_name: "Ramesh Kumar", message: "Work started. Disassembled switch panel & testing capacitor resistance.", details: "Diagnostics clear" },
        { timestamp: "02:45 PM", author_role: "Technician", author_name: "Ramesh Kumar", message: "Technician finished work and uploaded photo proof. Closure OTP requested from student Arjun Patel.", details: "Pending student sign-off" }
      ]
    },
    {
      id: "CMP-8013",
      title: "Continuous Tap Dripping in Bathroom Basin",
      category: "Plumbing",
      block: "Block A",
      room: "A-112",
      student_name: "Kavya Menon",
      student_phone: "+91 98334 55667",
      student_roll: "2023ECB2019",
      description: "Tap has a fast drip that doesn't shut even when closed tight. Waste of water and annoying noise all night.",
      priority: "Routine",
      preferred_slot: "Anytime",
      status: "waiting_parts",
      technician_id: "TECH-02",
      technician_name: "Suresh Yadav",
      technician_phone: "+91 98721 00223",
      expected_window: "Tomorrow 10:30 AM",
      eta_minutes: 180,
      is_escalated: 0,
      escalation_level: 0,
      closure_otp: "3914",
      proof_image_url: null,
      resolution_notes: "Inspected at 11:20 AM. Internal ceramic washer thread stripped. Ordered 15mm brass spindle from central store.",
      repeat_count: 0,
      delay_reason: "Awaiting Brass Spindle 15mm from Central Store (Restock batch arriving tomorrow morning)",
      delay_category: "Awaiting Spare Parts",
      created_at: "Today 08:00 AM",
      updated_at: "Today 11:30 AM",
      sla_deadline: "Tomorrow 08:00 AM",
      timeline: [
        { timestamp: "08:00 AM", author_role: "Student", author_name: "Kavya Menon", message: "Complaint filed: Basin tap dripping continuously.", details: "Initial filing" },
        { timestamp: "09:30 AM", author_role: "Technician", author_name: "Suresh Yadav", message: "Assigned to Suresh Yadav (Plumber).", details: "Assigned" },
        { timestamp: "11:30 AM", author_role: "Technician", author_name: "Suresh Yadav", message: "Inspection completed. Ceramic spindle required. Part requested from Central Store.", details: "Delay explained: Restock arriving tomorrow" }
      ]
    },
    {
      id: "CMP-8014",
      title: "Geyser Tripping Corridor MCB with Burning Smell",
      category: "Electrical",
      block: "Block B",
      room: "B-218",
      student_name: "Rohan Deshmukh",
      student_phone: "+91 98450 77889",
      student_roll: "2024MEB3092",
      description: "As soon as geyser switch is pressed, sparks flickered in switchboard and corridor power tripped. Immediate hazard.",
      priority: "Critical Hazard",
      preferred_slot: "Emergency / Immediate",
      status: "escalated",
      technician_id: "TECH-01",
      technician_name: "Ramesh Kumar",
      technician_phone: "+91 98721 00112",
      expected_window: "Immediate - Within 60 mins",
      eta_minutes: 25,
      is_escalated: 1,
      escalation_level: 1,
      escalation_reason: "SLA breach on Critical Hazard: Electrical fault unresolved over 14 hrs. Auto-escalated to Warden.",
      closure_otp: "6109",
      proof_image_url: null,
      resolution_notes: null,
      repeat_count: 2,
      delay_reason: "Main distribution box diagnosis in progress. Requires campus estate officer approval for power shut down.",
      delay_category: "Supervisor Approval Required",
      created_at: "Yesterday 08:00 PM",
      updated_at: "Today 12:00 PM",
      sla_deadline: "Breached (SLA 4h)",
      timeline: [
        { timestamp: "08:00 PM", author_role: "Student", author_name: "Rohan Deshmukh", message: "CRITICAL HAZARD: Geyser sparks and MCB tripped.", details: "High priority" },
        { timestamp: "12:00 PM", author_role: "System", author_name: "SLA Monitor", message: "SLA breached (>14h without fix on Critical Hazard). Auto-escalated to Warden Dr. Sharma.", details: "Warden alert triggered" }
      ]
    },
    {
      id: "CMP-8015",
      title: "Window Pane Latch Broken - Rattles in High Wind",
      category: "Carpentry",
      block: "Block C",
      room: "C-309",
      student_name: "Tanmay Varma",
      student_phone: "+91 98660 33441",
      student_roll: "2024CVB4012",
      description: "Left window hinge screws came off. Rainwater enters if wind blows.",
      priority: "Routine",
      preferred_slot: "16:00 - 18:00",
      status: "in_progress",
      technician_id: "TECH-03",
      technician_name: "Jagdish Mistri",
      technician_phone: "+91 98721 00334",
      expected_window: "Today 16:30 - 17:30",
      eta_minutes: 15,
      is_escalated: 0,
      escalation_level: 0,
      closure_otp: "8521",
      proof_image_url: null,
      resolution_notes: "Carrying replacement stay hinges and wooden plugs. Work currently underway in C-309.",
      repeat_count: 0,
      delay_reason: null,
      created_at: "Today 01:00 PM",
      updated_at: "Today 04:00 PM",
      sla_deadline: "Tomorrow 01:00 PM",
      timeline: [
        { timestamp: "01:00 PM", author_role: "Student", author_name: "Tanmay Varma", message: "Window hinge loose and rattling.", details: "Initial filing" },
        { timestamp: "02:30 PM", author_role: "Technician", author_name: "Jagdish Mistri", message: "Assigned to Jagdish Mistri (Carpenter).", details: "Assigned" },
        { timestamp: "04:00 PM", author_role: "Technician", author_name: "Jagdish Mistri", message: "Work started. Aligning friction hinges with new anchor plugs.", details: "Underway" }
      ]
    },
    {
      id: "CMP-8016",
      title: "LAN Port Not Giving Connection & RJ-45 Clip Stuck",
      category: "Electrical",
      block: "Block D",
      room: "D-402",
      student_name: "Neha Sharma",
      student_phone: "+91 98112 99001",
      student_roll: "2023ITB1088",
      description: "Ethernet faceplate port pins appear bent, cannot connect internet cable for semester exams project.",
      priority: "High",
      preferred_slot: "Morning (09:00 - 12:00)",
      status: "submitted",
      technician_id: null,
      technician_name: null,
      technician_phone: null,
      expected_window: "Assignment pending (Avg 45 mins)",
      eta_minutes: 90,
      is_escalated: 0,
      escalation_level: 0,
      closure_otp: "4217",
      proof_image_url: null,
      resolution_notes: null,
      repeat_count: 0,
      delay_reason: null,
      created_at: "Today 04:15 PM",
      updated_at: "Today 04:15 PM",
      sla_deadline: "Tomorrow 04:15 PM",
      timeline: [
        { timestamp: "04:15 PM", author_role: "Student", author_name: "Neha Sharma", message: "Complaint filed via mobile portal.", details: "Awaiting technician auto-match" }
      ]
    },
    {
      id: "CMP-8010",
      title: "Tube Light Starter Flickering and Humming",
      category: "Electrical",
      block: "Block A",
      room: "A-205",
      student_name: "Devansh Gupta",
      student_phone: "+91 98991 22334",
      student_roll: "2022CSB1002",
      description: "Main desk tubelight blinks constantly, makes study impossible.",
      priority: "Routine",
      preferred_slot: "Anytime",
      status: "verified_closed",
      technician_id: "TECH-01",
      technician_name: "Ramesh Kumar",
      technician_phone: "+91 98721 00112",
      expected_window: "Completed",
      eta_minutes: 0,
      is_escalated: 0,
      escalation_level: 0,
      closure_otp: "9021",
      proof_image_url: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=600&q=80",
      resolution_notes: "Replaced faulty electronic choke with 20W LED fixture. Tested illuminance.",
      student_rating: 5,
      student_feedback: "Technician Ramesh came on time, fixed it in 15 mins, and showed photo before asking for OTP. Super transparent!",
      repeat_count: 0,
      delay_reason: null,
      created_at: "Yesterday 09:00 AM",
      updated_at: "Yesterday 03:00 PM",
      sla_deadline: "Completed",
      timeline: [
        { timestamp: "09:00 AM", author_role: "Student", author_name: "Devansh Gupta", message: "Complaint filed.", details: "Initial filing" },
        { timestamp: "01:30 PM", author_role: "Technician", author_name: "Ramesh Kumar", message: "Fixture replaced with new LED choke.", details: "Photo proof uploaded" },
        { timestamp: "03:00 PM", author_role: "Student", author_name: "Devansh Gupta", message: "Student confirmed fix with OTP. Rated: 5/5 stars.", details: "Loop closed" }
      ]
    }
  ],
  technicians: [
    { id: "TECH-01", name: "Ramesh Kumar", trade: "Electrical", phone: "+91 98721 00112", assigned_block: "Block C & D", status: "On Job", active_jobs: 2, completed_today: 4, rating: 4.85, avatar: "RK" },
    { id: "TECH-02", name: "Suresh Yadav", trade: "Plumbing", phone: "+91 98721 00223", assigned_block: "Block A & B", status: "Available", active_jobs: 1, completed_today: 3, rating: 4.70, avatar: "SY" },
    { id: "TECH-03", name: "Jagdish Mistri", trade: "Carpentry", phone: "+91 98721 00334", assigned_block: "All Blocks", status: "On Job", active_jobs: 1, completed_today: 2, rating: 4.90, avatar: "JM" },
    { id: "TECH-04", name: "Santosh Rawat", trade: "Pest Control & Civil", phone: "+91 98721 00445", assigned_block: "All Blocks", status: "Available", active_jobs: 0, completed_today: 5, rating: 4.65, avatar: "SR" }
  ],
  inventory: [
    { id: "PART-01", item_name: "Ceiling Fan Capacitor 2.5uF", trade: "Electrical", stock_quantity: 6, status: "In Stock", eta_restock: "Immediate" },
    { id: "PART-02", item_name: "Brass Tap Spindle 15mm", trade: "Plumbing", stock_quantity: 2, status: "Low Stock", eta_restock: "Tomorrow 10:00 AM" },
    { id: "PART-03", item_name: "Door Latch Tower Bolt 6-inch", trade: "Carpentry", stock_quantity: 14, status: "In Stock", eta_restock: "Immediate" },
    { id: "PART-04", item_name: "LED Tube Light 20W 6500K", trade: "Electrical", stock_quantity: 18, status: "In Stock", eta_restock: "Immediate" },
    { id: "PART-05", item_name: "Flush Cistern Siphon Valve", trade: "Plumbing", stock_quantity: 0, status: "Out of Stock", eta_restock: "Arriving in 24 hrs" },
    { id: "PART-06", item_name: "Window Friction Stay Hinges", trade: "Carpentry", stock_quantity: 4, status: "Low Stock", eta_restock: "Tomorrow 2:00 PM" }
  ]
};

// Application State
const state = {
  isOfflineMode: false,
  currentView: 'student',
  complaints: [],
  technicians: [],
  inventory: [],
  analytics: {},
  studentFilter: 'all',
  searchQuery: '',
  selectedRating: 5,
  proofPhotos: [
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80"
  ],
  photoIndex: 0
};

// Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  
  let bg = 'bg-slate-900 text-white border-slate-700';
  let icon = 'ℹ️';
  if (type === 'success') {
    bg = 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/30';
    icon = '✓';
  } else if (type === 'warning') {
    bg = 'bg-amber-600 text-white border-amber-500 shadow-amber-500/30';
    icon = '⚠️';
  } else if (type === 'error') {
    bg = 'bg-red-600 text-white border-red-500 shadow-red-500/30';
    icon = '✕';
  }

  toast.className = `toast-item pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-xs font-semibold ${bg}`;
  toast.innerHTML = `<span class="text-sm">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Global View Switcher
window.switchView = function(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.view-panel').forEach(panel => panel.classList.add('hidden'));
  document.querySelectorAll('.role-tab').forEach(tab => {
    if (tab.dataset.view === viewName) {
      tab.classList.add('active');
      tab.classList.remove('text-slate-400');
    } else {
      tab.classList.remove('active');
      tab.classList.add('text-slate-400');
    }
  });

  const activePanel = document.getElementById(`view-${viewName}`);
  if (activePanel) {
    activePanel.classList.remove('hidden');
  }

  renderAll();
};

// Fetch data from API with instant graceful localStorage fallback
async function fetchData() {
  try {
    const res = await fetch('/api/complaints');
    if (!res.ok) throw new Error('HTTP error ' + res.status);
    const compData = await res.json();
    const techData = await (await fetch('/api/technicians')).json();
    const invData = await (await fetch('/api/inventory')).json();
    const anaData = await (await fetch('/api/analytics')).json();

    state.complaints = compData.complaints || [];
    state.technicians = techData.technicians || [];
    state.inventory = invData.inventory || [];
    state.analytics = anaData || {};
    state.isOfflineMode = false;
  } catch (err) {
    // Graceful offline / standalone mode fallback
    state.isOfflineMode = true;
    const local = localStorage.getItem('loop_hostel_data');
    if (local) {
      const parsed = JSON.parse(local);
      state.complaints = parsed.complaints;
      state.technicians = parsed.technicians;
      state.inventory = parsed.inventory;
    } else {
      state.complaints = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA.complaints));
      state.technicians = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA.technicians));
      state.inventory = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA.inventory));
      saveToLocal();
    }
    computeLocalAnalytics();
  }

  renderAll();
}

function saveToLocal() {
  localStorage.setItem('loop_hostel_data', JSON.stringify({
    complaints: state.complaints,
    technicians: state.technicians,
    inventory: state.inventory
  }));
  computeLocalAnalytics();
}

function computeLocalAnalytics() {
  const total = state.complaints.length;
  const closed = state.complaints.filter(c => c.status === 'verified_closed').length;
  const escalated = state.complaints.filter(c => c.is_escalated === 1 && c.status !== 'verified_closed').length;
  const repeat = state.complaints.filter(c => c.repeat_count > 0).length;
  
  const ratings = state.complaints.filter(c => c.student_rating > 0).map(c => c.student_rating);
  const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2) : 4.82;

  state.analytics = {
    total,
    verified_closed: closed,
    escalated_count: escalated,
    repeat_complaints: repeat,
    avg_rating: avgRating,
    first_time_fix_rate: '84.2%'
  };
}

// Master Render
function renderAll() {
  updateBadges();
  renderStudentView();
  renderTechnicianView();
  renderWardenView();
}

function updateBadges() {
  const rameshJobs = state.complaints.filter(c => c.technician_id === 'TECH-01' && c.status !== 'verified_closed');
  const techBadge = document.getElementById('tech-badge-count');
  if (techBadge) techBadge.innerText = rameshJobs.length;

  const escalations = state.complaints.filter(c => c.is_escalated === 1 && c.status !== 'verified_closed');
  const wardenBadge = document.getElementById('warden-escalation-badge');
  if (wardenBadge) wardenBadge.innerText = escalations.length;
}

// ============================================
// STUDENT VIEW RENDERING
// ============================================
function renderStudentView() {
  const container = document.getElementById('student-complaints-list');
  if (!container) return;

  let filtered = state.complaints;

  const countAll = state.complaints.length;
  const countActive = state.complaints.filter(c => c.status !== 'verified_closed').length;
  const countVerify = state.complaints.filter(c => c.status === 'resolved').length;
  const countClosed = state.complaints.filter(c => c.status === 'verified_closed').length;

  const cAll = document.getElementById('count-all');
  const cActive = document.getElementById('count-active');
  const cVerify = document.getElementById('count-verify');
  const cClosed = document.getElementById('count-closed');

  if (cAll) cAll.innerText = countAll;
  if (cActive) cActive.innerText = countActive;
  if (cVerify) cVerify.innerText = countVerify;
  if (cClosed) cClosed.innerText = countClosed;

  if (state.studentFilter === 'active') {
    filtered = filtered.filter(c => c.status !== 'verified_closed');
  } else if (state.studentFilter === 'needs_verify') {
    filtered = filtered.filter(c => c.status === 'resolved');
  } else if (state.studentFilter === 'closed') {
    filtered = filtered.filter(c => c.status === 'verified_closed');
  }

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.room.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 space-y-2">
        <div class="text-3xl">📭</div>
        <div class="font-semibold text-slate-700">No complaints matching filter</div>
        <p class="text-xs text-slate-400">Try changing your search term or select "All Complaints".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(comp => renderSingleComplaintCard(comp)).join('');
}

function renderSingleComplaintCard(comp) {
  let priorityBadge = '<span class="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">Routine</span>';
  if (comp.priority === 'High') {
    priorityBadge = '<span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">High Urgency</span>';
  } else if (comp.priority === 'Critical Hazard') {
    priorityBadge = '<span class="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">Critical Hazard ⚡</span>';
  }

  const stages = [
    { key: 'submitted', label: 'Filed & Queued' },
    { key: 'assigned', label: 'Tech Assigned' },
    { key: 'in_transit', label: 'On Route / Slot' },
    { key: 'in_progress', label: 'Fix Underway' },
    { key: 'resolved', label: 'Verify Closure' },
    { key: 'verified_closed', label: 'Loop Closed' }
  ];

  let currentStageIndex = 0;
  if (comp.status === 'submitted') currentStageIndex = 0;
  else if (comp.status === 'assigned') currentStageIndex = 1;
  else if (comp.status === 'in_transit' || comp.status === 'waiting_parts') currentStageIndex = 2;
  else if (comp.status === 'in_progress') currentStageIndex = 3;
  else if (comp.status === 'resolved') currentStageIndex = 4;
  else if (comp.status === 'verified_closed') currentStageIndex = 5;

  const stepperHtml = stages.map((st, idx) => {
    let nodeClass = 'step-node pending';
    let icon = (idx + 1);

    if (idx < currentStageIndex) {
      nodeClass = 'step-node completed';
      icon = '✓';
    } else if (idx === currentStageIndex) {
      if (comp.status === 'waiting_parts') {
        nodeClass = 'step-node delayed';
        icon = '⏸';
      } else if (comp.status === 'escalated') {
        nodeClass = 'step-node escalated';
        icon = '!';
      } else if (comp.status === 'verified_closed') {
        nodeClass = 'step-node completed';
        icon = '✓';
      } else {
        nodeClass = 'step-node active';
      }
    }

    return `
      <div class="flex-1 flex flex-col items-center text-center">
        <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${nodeClass}">
          ${icon}
        </div>
        <span class="text-[10px] mt-1 font-medium ${idx <= currentStageIndex ? 'text-slate-800 font-bold' : 'text-slate-400'}">${st.label}</span>
      </div>
    `;
  }).join('<div class="w-4 sm:w-10 h-0.5 bg-slate-200 mt-3 -mx-2"></div>');

  let delayBannerHtml = '';
  if (comp.delay_reason) {
    delayBannerHtml = `
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
        <span class="text-base text-amber-600">⚠️</span>
        <div class="flex-grow">
          <div class="font-bold flex items-center justify-between">
            <span>Transparent Delay Notice: ${comp.delay_category || 'Hold on Schedule'}</span>
            <span class="text-[10px] bg-amber-200/70 text-amber-950 px-2 py-0.5 rounded font-mono font-bold">No Guesswork</span>
          </div>
          <p class="text-[11px] text-amber-800 mt-0.5">${comp.delay_reason}</p>
        </div>
      </div>
    `;
  }

  let escalationBannerHtml = '';
  if (comp.is_escalated === 1 && comp.status !== 'verified_closed') {
    escalationBannerHtml = `
      <div class="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-red-900">
        <span class="text-base text-red-600">🚨</span>
        <div class="flex-grow">
          <div class="font-bold flex items-center justify-between">
            <span>Escalated to Hostel Warden Dr. Sharma</span>
            <span class="text-[10px] bg-red-200 text-red-900 px-2 py-0.5 rounded font-mono font-bold">Priority #1</span>
          </div>
          <p class="text-[11px] text-red-800 mt-0.5">${comp.escalation_reason || 'Unresolved beyond expected turnaround window.'}</p>
        </div>
      </div>
    `;
  }

  let repeatWarningHtml = '';
  if (comp.repeat_count > 0) {
    repeatWarningHtml = `
      <div class="inline-flex items-center gap-1.5 text-[10px] bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-full font-semibold">
        <span>🔁 Repeat Breakdown:</span>
        <span>Reported ${comp.repeat_count}x previously. Warden flagged for permanent overhaul.</span>
      </div>
    `;
  }

  let closureActionHtml = '';
  if (comp.status === 'resolved') {
    closureActionHtml = `
      <div class="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">Photo Proof Ready</span>
            <h4 class="font-bold text-emerald-950 text-xs sm:text-sm">Technician reported repair complete. Please verify!</h4>
          </div>
          <p class="text-[11px] text-emerald-800">
            Check the repair photo below. Enter your 4-digit OTP (<span class="font-mono font-bold text-emerald-950 bg-emerald-200/80 px-1 rounded">${comp.closure_otp}</span>) to sign off and close the loop.
          </p>
        </div>
        <button onclick="window.openStudentVerifyModal('${comp.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0">
          <span>Verify & Close Ticket</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </button>
      </div>
    `;
  } else if (comp.status === 'verified_closed') {
    closureActionHtml = `
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs text-slate-600">
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
          <span>Verified & Signed Off by ${comp.student_name} (${comp.student_rating || 5}/5 Stars)</span>
        </div>
        <span class="text-[11px] text-slate-400 font-mono font-semibold">Loop Closed</span>
      </div>
    `;
  }

  const timelineItems = (comp.timeline || []).map(ev => `
    <div class="flex items-start gap-2 text-[11px] pb-1.5 border-b border-slate-100 last:border-0">
      <span class="font-mono text-slate-400 shrink-0">${ev.timestamp.split(' ').pop()}</span>
      <div>
        <span class="font-bold text-slate-700">${ev.author_name} (${ev.author_role}):</span>
        <span class="text-slate-600">${ev.message}</span>
        ${ev.details ? `<div class="text-[10px] text-slate-400 mt-0.5">${ev.details}</div>` : ''}
      </div>
    </div>
  `).join('') || '<div class="text-xs text-slate-400">Complaint queued for inspection.</div>';

  return `
    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 hover:border-slate-300 transition" id="card-${comp.id}">
      
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">${comp.id}</span>
            <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">${comp.category}</span>
            ${priorityBadge}
            ${repeatWarningHtml}
          </div>
          <h3 class="text-base font-bold text-slate-900">${comp.title}</h3>
          <p class="text-xs text-slate-500">${comp.description || 'No additional notes provided.'}</p>
        </div>

        <div class="text-right sm:shrink-0 bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
          <div class="text-[11px] text-slate-400">Location</div>
          <div class="text-xs font-bold text-slate-800 font-mono">${comp.room} (${comp.block})</div>
          <div class="text-[10px] text-slate-500 mt-0.5">Slot: ${comp.preferred_slot || 'Anytime'}</div>
        </div>
      </div>

      <div class="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
        <div class="flex items-center justify-between">
          ${stepperHtml}
        </div>
      </div>

      ${delayBannerHtml}
      ${escalationBannerHtml}

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
            ${comp.technician_name ? comp.technician_name.split(' ').map(n=>n[0]).join('') : 'T'}
          </div>
          <div class="flex-grow">
            <div class="text-[10px] text-slate-400 font-medium uppercase">Assigned Technician</div>
            <div class="font-bold text-slate-800">${comp.technician_name || 'Smart Dispatching...'}</div>
            <div class="text-[11px] text-blue-600 font-mono">${comp.technician_phone || 'Staff Contact Center'}</div>
          </div>
        </div>

        <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <div class="text-[10px] text-slate-400 font-medium uppercase">Expected Visit Window</div>
            <div class="font-bold text-slate-800">${comp.expected_window || 'Scheduling in progress'}</div>
            <div class="text-[10px] text-slate-500">SLA: ${comp.sla_deadline ? comp.sla_deadline.split(' ').pop() : 'Within 24h'}</div>
          </div>
          ${comp.status !== 'verified_closed' && comp.is_escalated === 0 ? `
            <button onclick="window.triggerEscalation('${comp.id}')" class="text-[10px] bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-2.5 py-1.5 rounded-lg border border-red-200 transition">
              Escalate to Warden
            </button>
          ` : ''}
        </div>
      </div>

      ${closureActionHtml}

      <details class="text-xs text-slate-500 pt-1 group">
        <summary class="cursor-pointer text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 select-none">
          <span>View Transparent Activity Log</span>
          <svg class="w-3.5 h-3.5 group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </summary>
        <div class="mt-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
          ${timelineItems}
        </div>
      </details>

    </div>
  `;
}

// ============================================
// TECHNICIAN VIEW RENDERING
// ============================================
function renderTechnicianView() {
  const container = document.getElementById('tech-jobs-container');
  if (!container) return;

  const jobs = state.complaints.filter(c => c.status !== 'verified_closed');

  const pendingCount = jobs.filter(c => c.status !== 'resolved').length;
  const doneCount = state.complaints.filter(c => c.status === 'verified_closed' && c.technician_id === 'TECH-01').length;
  
  const statPending = document.getElementById('tech-stat-pending');
  const statDone = document.getElementById('tech-stat-done');
  const counter = document.getElementById('tech-cards-counter');
  
  if (statPending) statPending.innerText = pendingCount;
  if (statDone) statDone.innerText = doneCount;
  if (counter) counter.innerText = `${jobs.length} Active in Queue`;

  if (jobs.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
        <div class="text-3xl mb-1">🎉</div>
        <div class="font-bold text-slate-800">All assigned jobs completed!</div>
        <p class="text-xs text-slate-400">Check Central Store inventory or wait for new room dispatches.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = jobs.map(comp => `
    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5 hover:border-amber-300 transition">
      
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <span class="bg-amber-500 text-white font-mono font-black text-xs px-2.5 py-1 rounded-lg shadow-xs">${comp.room}</span>
          <span class="text-xs font-bold text-slate-800">${comp.block}</span>
          <span class="text-[10px] text-slate-400 font-medium">Floor ${comp.room.replace(/[^0-9]/g, '')[0] || '1'} Proximity</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="font-mono text-xs text-slate-400">${comp.id}</span>
          ${comp.priority === 'Critical Hazard' ? '<span class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Hazard</span>' : ''}
        </div>
      </div>

      <div>
        <h4 class="font-bold text-sm text-slate-900">${comp.title}</h4>
        <p class="text-xs text-slate-600 mt-1">${comp.description || 'Inspection required.'}</p>
        <div class="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
          <span>Resident: <strong>${comp.student_name}</strong></span>
          <span>•</span>
          <span>Slot: <strong>${comp.preferred_slot || 'Anytime'}</strong></span>
        </div>
      </div>

      ${comp.delay_reason ? `
        <div class="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-xs text-amber-900 flex items-center justify-between">
          <span class="font-medium">⏸ ${comp.delay_reason}</span>
          <span class="text-[10px] bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded">Paused</span>
        </div>
      ` : ''}

      <div class="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div class="text-xs">
          <span class="text-slate-400">Current Status:</span>
          <span class="font-bold text-slate-800 ml-1 uppercase text-[11px] bg-slate-100 px-2 py-0.5 rounded">${comp.status.replace('_', ' ')}</span>
        </div>

        <div class="flex items-center gap-2">
          ${comp.status === 'assigned' ? `
            <button onclick="window.updateTechStatus('${comp.id}', 'in_transit')" class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-xs">
              🚀 On the Way (10m ETA)
            </button>
          ` : ''}

          ${comp.status === 'in_transit' ? `
            <button onclick="window.updateTechStatus('${comp.id}', 'in_progress')" class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-xs">
              🔨 Start Work
            </button>
          ` : ''}

          ${comp.status === 'in_progress' || comp.status === 'in_transit' ? `
            <button onclick="window.openTechDelayModal('${comp.id}')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition">
              📦 Log Missing Spare
            </button>
            <button onclick="window.openTechProofModal('${comp.id}', '${comp.title}')" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-xs flex items-center gap-1.5">
              <span>📸 Complete & Photo Proof</span>
            </button>
          ` : ''}

          ${comp.status === 'waiting_parts' ? `
            <button onclick="window.updateTechStatus('${comp.id}', 'in_progress')" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-xs">
              ✓ Spare Received, Resume Work
            </button>
          ` : ''}

          ${comp.status === 'resolved' ? `
            <span class="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg font-bold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Awaiting Student OTP Sign-off
            </span>
          ` : ''}
        </div>
      </div>

    </div>
  `).join('');

  renderInventoryList();
}

function renderInventoryList() {
  const container = document.getElementById('tech-inventory-list');
  if (!container) return;

  container.innerHTML = state.inventory.map(item => {
    let stockBadge = '<span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">In Stock</span>';
    if (item.stock_quantity === 0) {
      stockBadge = '<span class="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-[10px]">Out of Stock</span>';
    } else if (item.stock_quantity < 5) {
      stockBadge = '<span class="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">Low Stock</span>';
    }

    return `
      <div class="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div>
          <div class="font-bold text-slate-800">${item.item_name}</div>
          <div class="text-[10px] text-slate-500">${item.trade} · Restock: ${item.eta_restock}</div>
        </div>
        <div class="text-right">
          <div class="font-mono font-bold text-xs text-slate-900">${item.stock_quantity} left</div>
          ${stockBadge}
        </div>
      </div>
    `;
  }).join('');
}

// ============================================
// WARDEN & ADMIN HQ VIEW RENDERING
// ============================================
function renderWardenView() {
  const ana = state.analytics;
  if (!ana) return;

  const ftfrEl = document.getElementById('stat-ftfr');
  const repEl = document.getElementById('stat-repeat');
  const escEl = document.getElementById('stat-escalations');
  const ratEl = document.getElementById('stat-rating');

  if (ftfrEl) ftfrEl.innerText = ana.first_time_fix_rate || '84.2%';
  if (repEl) repEl.innerText = `${ana.repeat_complaints || 2} Cases`;
  if (escEl) escEl.innerText = `${ana.escalated_count || 1} Active`;
  if (ratEl) ratEl.innerText = `${ana.avg_rating || 4.82} / 5`;

  const queueContainer = document.getElementById('warden-escalation-container');
  if (!queueContainer) return;

  const escalatedList = state.complaints.filter(c => c.is_escalated === 1 && c.status !== 'verified_closed');

  if (escalatedList.length === 0) {
    queueContainer.innerHTML = `
      <div class="p-6 text-center text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
        <div class="text-2xl mb-1">🛡️</div>
        <div class="font-semibold text-slate-700">No active escalations</div>
        <p class="text-xs text-slate-400">All maintenance tickets are operating within SLA deadlines.</p>
      </div>
    `;
    return;
  }

  queueContainer.innerHTML = escalatedList.map(comp => `
    <div class="bg-red-50/50 border border-red-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="font-mono text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded">${comp.id}</span>
          <span class="font-bold text-sm text-red-950">${comp.title}</span>
          <span class="text-xs bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded">${comp.room}</span>
        </div>
        <p class="text-xs text-red-900">${comp.escalation_reason || 'SLA breached on urgent repair.'}</p>
        <div class="text-[11px] text-slate-500">
          Assigned Tech: <strong>${comp.technician_name || 'None'}</strong> · Delay: ${comp.delay_reason || 'None reported'}
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button onclick="window.wardenOverrideAction('${comp.id}', 'reassign')" class="bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition">
          Reassign Tech
        </button>
        <button onclick="window.wardenOverrideAction('${comp.id}', 'expedite')" class="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm transition">
          Expedite Estate Office
        </button>
      </div>
    </div>
  `).join('');
}

// ============================================
// MODAL CONTROLLERS & ACTIONS
// ============================================

// Report Fault Modal
const modalComplaint = document.getElementById('modal-new-complaint');
document.getElementById('btn-new-complaint-top')?.addEventListener('click', () => modalComplaint.classList.remove('hidden'));
document.getElementById('btn-file-complaint-hero')?.addEventListener('click', () => modalComplaint.classList.remove('hidden'));
document.getElementById('btn-close-modal-complaint')?.addEventListener('click', () => modalComplaint.classList.add('hidden'));
document.getElementById('btn-cancel-modal-complaint')?.addEventListener('click', () => modalComplaint.classList.add('hidden'));

// Submit new complaint
document.getElementById('form-new-complaint')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const category = document.getElementById('comp-category').value;
  const title = document.getElementById('comp-title').value;
  const block = document.getElementById('comp-block').value;
  const room = document.getElementById('comp-room').value;
  const priority = document.querySelector('input[name="comp-priority"]:checked').value;
  const preferred_slot = document.getElementById('comp-slot').value;
  const description = document.getElementById('comp-desc').value;

  const newId = `CMP-${Math.floor(8100 + Math.random() * 900)}`;
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  if (!state.isOfflineMode) {
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, category, block, room, priority, preferred_slot, description,
          student_name: 'Arjun Patel',
          student_roll: '2024CSB1044'
        })
      });
      const result = await res.json();
      if (result.success) {
        modalComplaint.classList.add('hidden');
        document.getElementById('form-new-complaint').reset();
        showToast(`Complaint filed (${result.complaint_id})! OTP: ${result.closure_otp}`, 'success');
        fetchData();
        return;
      }
    } catch (err) {
      // Fall through to local mode
    }
  }

  // Local mode creation
  const newComplaint = {
    id: newId,
    title,
    category,
    block,
    room,
    student_name: 'Arjun Patel',
    student_phone: '+91 98201 11223',
    student_roll: '2024CSB1044',
    description,
    priority,
    preferred_slot,
    status: 'assigned',
    technician_id: 'TECH-01',
    technician_name: 'Ramesh Kumar',
    technician_phone: '+91 98721 00112',
    expected_window: priority === 'Critical Hazard' ? 'Immediate (<60 mins)' : 'Today 16:00 - 18:00',
    eta_minutes: 45,
    is_escalated: 0,
    escalation_level: 0,
    closure_otp: otp,
    proof_image_url: null,
    resolution_notes: null,
    repeat_count: 0,
    created_at: 'Just now',
    updated_at: 'Just now',
    sla_deadline: 'Tomorrow 05:00 PM',
    timeline: [
      { timestamp: 'Just now', author_role: 'Student', author_name: 'Arjun Patel', message: 'Complaint filed via portal.', details: `Slot preference: ${preferred_slot}` },
      { timestamp: 'Just now', author_role: 'System', author_name: 'Auto-Dispatcher', message: 'Assigned to Ramesh Kumar (Lead Electrician).', details: 'Proximity match' }
    ]
  };

  state.complaints.unshift(newComplaint);
  saveToLocal();
  modalComplaint.classList.add('hidden');
  document.getElementById('form-new-complaint').reset();
  showToast(`Complaint filed (${newId})! Your Closure OTP is ${otp}`, 'success');
  renderAll();
});

// Technician Actions
window.updateTechStatus = async function(compId, status) {
  if (!state.isOfflineMode) {
    try {
      const res = await fetch(`/api/complaints/${compId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          role: 'Technician',
          author: 'Ramesh Kumar (Lead Electrician)'
        })
      });
      const result = await res.json();
      if (result.success) {
        showToast(`Status updated to ${status.replace('_', ' ')}`, 'success');
        fetchData();
        return;
      }
    } catch (err) {}
  }

  // Local fallback
  const comp = state.complaints.find(c => c.id === compId);
  if (comp) {
    comp.status = status;
    comp.updated_at = 'Just now';
    if (!comp.timeline) comp.timeline = [];
    comp.timeline.push({
      timestamp: 'Just now',
      author_role: 'Technician',
      author_name: 'Ramesh Kumar',
      message: `Status updated to ${status.replace('_', ' ')}.`,
      details: 'Field app update'
    });
    saveToLocal();
    showToast(`Status updated to ${status.replace('_', ' ')}`, 'success');
    renderAll();
  }
};

// Technician Proof Modal
window.openTechProofModal = function(compId, title) {
  document.getElementById('tech-proof-comp-id').value = compId;
  document.getElementById('tech-proof-title').innerText = `${compId}: ${title}`;
  document.getElementById('modal-tech-proof').classList.remove('hidden');
};

document.getElementById('btn-close-tech-proof')?.addEventListener('click', () => {
  document.getElementById('modal-tech-proof').classList.add('hidden');
});
document.getElementById('btn-cancel-tech-proof')?.addEventListener('click', () => {
  document.getElementById('modal-tech-proof').classList.add('hidden');
});

window.cycleProofPhoto = function() {
  state.photoIndex = (state.photoIndex + 1) % state.proofPhotos.length;
  document.getElementById('tech-proof-preview').src = state.proofPhotos[state.photoIndex];
};

document.getElementById('btn-submit-tech-proof')?.addEventListener('click', async () => {
  const compId = document.getElementById('tech-proof-comp-id').value;
  const notes = document.getElementById('tech-proof-notes').value || 'Repaired and tested fixture. Ready for student verification.';
  const imageUrl = document.getElementById('tech-proof-preview').src;

  if (!state.isOfflineMode) {
    try {
      const res = await fetch(`/api/complaints/${compId}/proof`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          resolution_notes: notes,
          technician_name: 'Ramesh Kumar'
        })
      });
      const result = await res.json();
      if (result.success) {
        document.getElementById('modal-tech-proof').classList.add('hidden');
        showToast('Photo proof uploaded! Student notified for OTP verification.', 'success');
        fetchData();
        return;
      }
    } catch (err) {}
  }

  // Local fallback
  const comp = state.complaints.find(c => c.id === compId);
  if (comp) {
    comp.status = 'resolved';
    comp.proof_image_url = imageUrl;
    comp.resolution_notes = notes;
    comp.updated_at = 'Just now';
    if (!comp.timeline) comp.timeline = [];
    comp.timeline.push({
      timestamp: 'Just now',
      author_role: 'Technician',
      author_name: 'Ramesh Kumar',
      message: 'Technician uploaded resolution proof. Awaiting Student OTP verification.',
      details: notes
    });
    saveToLocal();
    document.getElementById('modal-tech-proof').classList.add('hidden');
    showToast('Photo proof uploaded! Student notified for OTP verification.', 'success');
    renderAll();
  }
});

// Technician Delay Modal
window.openTechDelayModal = function(compId) {
  document.getElementById('tech-delay-comp-id').value = compId;
  document.getElementById('modal-tech-delay').classList.remove('hidden');
};
document.getElementById('btn-close-tech-delay')?.addEventListener('click', () => {
  document.getElementById('modal-tech-delay').classList.add('hidden');
});
document.getElementById('btn-cancel-tech-delay')?.addEventListener('click', () => {
  document.getElementById('modal-tech-delay').classList.add('hidden');
});

document.getElementById('btn-submit-tech-delay')?.addEventListener('click', async () => {
  const compId = document.getElementById('tech-delay-comp-id').value;
  const category = document.getElementById('tech-delay-category').value;
  const reason = document.getElementById('tech-delay-reason').value;

  if (!state.isOfflineMode) {
    try {
      const res = await fetch(`/api/complaints/${compId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'waiting_parts',
          delay_category: category,
          delay_reason: reason,
          role: 'Technician',
          author: 'Ramesh Kumar'
        })
      });
      const result = await res.json();
      if (result.success) {
        document.getElementById('modal-tech-delay').classList.add('hidden');
        showToast('Transparent delay posted! Student tracker updated.', 'warning');
        fetchData();
        return;
      }
    } catch (err) {}
  }

  // Local fallback
  const comp = state.complaints.find(c => c.id === compId);
  if (comp) {
    comp.status = 'waiting_parts';
    comp.delay_category = category;
    comp.delay_reason = reason;
    comp.updated_at = 'Just now';
    if (!comp.timeline) comp.timeline = [];
    comp.timeline.push({
      timestamp: 'Just now',
      author_role: 'Technician',
      author_name: 'Ramesh Kumar',
      message: `Job on hold: ${reason}`,
      details: category
    });
    saveToLocal();
    document.getElementById('modal-tech-delay').classList.add('hidden');
    showToast('Transparent delay posted! Student tracker updated.', 'warning');
    renderAll();
  }
});

// Student Verify Modal
window.openStudentVerifyModal = function(compId) {
  const comp = state.complaints.find(c => c.id === compId);
  if (!comp) return;

  document.getElementById('verify-comp-id').value = comp.id;
  document.getElementById('verify-expected-otp').innerText = comp.closure_otp || '7482';
  document.getElementById('verify-input-otp').value = comp.closure_otp || '7482';
  document.getElementById('verify-proof-img').src = comp.proof_image_url || state.proofPhotos[0];
  document.getElementById('verify-tech-notes').innerText = `"${comp.resolution_notes || 'Fixture tested and working.'}"`;

  document.getElementById('modal-student-verify').classList.remove('hidden');
};

document.getElementById('btn-close-student-verify')?.addEventListener('click', () => {
  document.getElementById('modal-student-verify').classList.add('hidden');
});
document.getElementById('btn-cancel-student-verify')?.addEventListener('click', () => {
  document.getElementById('modal-student-verify').classList.add('hidden');
});

// Star rating buttons
document.querySelectorAll('.star-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = parseInt(btn.dataset.val);
    state.selectedRating = val;
    document.querySelectorAll('.star-btn').forEach(b => {
      b.classList.toggle('text-amber-400', parseInt(b.dataset.val) <= val);
      b.classList.toggle('text-slate-300', parseInt(b.dataset.val) > val);
    });
    const labelMap = { 1: '1 Star (Poor)', 2: '2 Stars (Fair)', 3: '3 Stars (Good)', 4: '4 Stars (Very Good)', 5: '5 Stars (Excellent)' };
    document.getElementById('star-rating-label').innerText = labelMap[val];
  });
});

document.getElementById('btn-submit-student-verify')?.addEventListener('click', async () => {
  const compId = document.getElementById('verify-comp-id').value;
  const otp = document.getElementById('verify-input-otp').value;
  const feedback = document.getElementById('verify-feedback').value;

  if (!state.isOfflineMode) {
    try {
      const res = await fetch(`/api/complaints/${compId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          otp,
          rating: state.selectedRating,
          feedback
        })
      });
      const result = await res.json();
      if (result.success) {
        document.getElementById('modal-student-verify').classList.add('hidden');
        showToast('🎉 Loop Closed! Ticket verified and signed off.', 'success');
        fetchData();
        return;
      }
    } catch (err) {}
  }

  // Local fallback
  const comp = state.complaints.find(c => c.id === compId);
  if (comp) {
    if (otp !== comp.closure_otp) {
      showToast('Invalid OTP entered. Check your 4-digit code in the tracker.', 'error');
      return;
    }
    comp.status = 'verified_closed';
    comp.student_rating = state.selectedRating;
    comp.student_feedback = feedback;
    comp.updated_at = 'Just now';
    if (!comp.timeline) comp.timeline = [];
    comp.timeline.push({
      timestamp: 'Just now',
      author_role: 'Student',
      author_name: 'Resident Verified',
      message: `Student confirmed fix with OTP. Rated: ${state.selectedRating}/5 stars.`,
      details: feedback
    });
    saveToLocal();
    document.getElementById('modal-student-verify').classList.add('hidden');
    showToast('🎉 Loop Closed! Ticket verified and signed off.', 'success');
    renderAll();
  }
});

// Manual Escalation
window.triggerEscalation = async function(compId) {
  const reason = prompt('Specify escalation reason for Hostel Warden Dr. Sharma:', 'Technician has not visited within the scheduled window.');
  if (!reason) return;

  if (!state.isOfflineMode) {
    try {
      const res = await fetch(`/api/complaints/${compId}/escalate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          role: 'Student',
          author: 'Arjun Patel'
        })
      });
      const result = await res.json();
      if (result.success) {
        showToast('Complaint escalated to Hostel Warden office.', 'warning');
        fetchData();
        return;
      }
    } catch (err) {}
  }

  // Local fallback
  const comp = state.complaints.find(c => c.id === compId);
  if (comp) {
    comp.status = 'escalated';
    comp.is_escalated = 1;
    comp.escalation_reason = reason;
    comp.updated_at = 'Just now';
    if (!comp.timeline) comp.timeline = [];
    comp.timeline.push({
      timestamp: 'Just now',
      author_role: 'Student',
      author_name: 'Arjun Patel',
      message: `ESCALATED TO WARDEN: ${reason}`,
      details: 'Priority elevated'
    });
    saveToLocal();
    showToast('Complaint escalated to Hostel Warden office.', 'warning');
    renderAll();
  }
};

// Warden override action
window.wardenOverrideAction = function(compId, action) {
  const comp = state.complaints.find(c => c.id === compId);
  if (action === 'reassign') {
    if (comp) {
      comp.technician_name = 'Jagdish Mistri (Standby)';
      comp.status = 'assigned';
      saveToLocal();
    }
    showToast(`Warden reassigned ${compId} to backup technician Jagdish Mistri.`, 'info');
  } else {
    if (comp) {
      comp.is_escalated = 0;
      comp.delay_reason = 'Estate Office emergency shutdown approved for 17:00.';
      saveToLocal();
    }
    showToast(`Emergency requisition issued to Estate Office for ${compId}. Priority granted.`, 'success');
  }
  renderAll();
};

// Reset demo data
document.getElementById('btn-quick-seed')?.addEventListener('click', async () => {
  if (!state.isOfflineMode) {
    try {
      const res = await fetch('/api/reset-seed', { method: 'POST' });
      const result = await res.json();
      if (result.success) {
        showToast('Demo data reset to clean initial state', 'success');
        fetchData();
        return;
      }
    } catch (err) {}
  }

  localStorage.removeItem('loop_hostel_data');
  state.complaints = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA.complaints));
  state.technicians = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA.technicians));
  state.inventory = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA.inventory));
  saveToLocal();
  showToast('Demo data reset to clean initial state', 'success');
  renderAll();
});

// Search and filter listeners
document.querySelectorAll('.student-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.student-filter-btn').forEach(b => {
      b.classList.remove('active', 'bg-blue-50', 'text-blue-700', 'border-blue-200');
      b.classList.add('text-slate-600');
    });
    btn.classList.add('active', 'bg-blue-50', 'text-blue-700', 'border-blue-200');
    btn.classList.remove('text-slate-600');
    state.studentFilter = btn.dataset.filter;
    renderStudentView();
  });
});

document.getElementById('student-search-input')?.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  renderStudentView();
});

// Setup Role Tabs
document.querySelectorAll('.role-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    window.switchView(tab.dataset.view);
  });
});

// Initial Load
fetchData();
