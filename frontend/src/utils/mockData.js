import { seededRandom } from "@/lib/utils";

const rand = seededRandom(42);

const FIRST_NAMES = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Sai",
  "Reyansh",
  "Krishna",
  "Ishaan",
  "Rohan",
  "Ananya",
  "Diya",
  "Saanvi",
  "Aadhya",
  "Kavya",
  "Myra",
  "Anika",
  "Riya",
  "Pari",
  "Ira",
  "Meera",
  "Kabir",
  "Aryan",
  "Dhruv",
  "Neha",
  "Priya",
  "Sanya",
  "Tara",
  "Vikram",
  "Rahul",
  "Nikhil",
  "Simran",
  "Pooja",
  "Amit",
  "Sunita",
  "Rajesh",
  "Deepak",
  "Kiran",
  "Manish",
  "Shreya",
];
const LAST_NAMES = [
  "Sharma",
  "Verma",
  "Gupta",
  "Malhotra",
  "Kapoor",
  "Iyer",
  "Nair",
  "Reddy",
  "Rao",
  "Menon",
  "Joshi",
  "Chatterjee",
  "Bose",
  "Mehta",
  "Agarwal",
  "Singh",
  "Kumar",
  "Patel",
  "Desai",
  "Pillai",
];
const DOCTORS = [
  { id: "doc-1", name: "Dr. Arvind Sethi", specialty: "Cardiology" },
  { id: "doc-2", name: "Dr. Meenal Kulkarni", specialty: "Dermatology" },
  { id: "doc-3", name: "Dr. Farah Sheikh", specialty: "Orthopedics" },
  { id: "doc-4", name: "Dr. Ravi Chandran", specialty: "ENT" },
  { id: "doc-5", name: "Dr. Lisa Fernandes", specialty: "Pediatrics" },
  { id: "doc-6", name: "Dr. Sameer Bhatt", specialty: "General Medicine" },
  { id: "doc-7", name: "Dr. Nandita Rao", specialty: "Gynecology" },
  { id: "doc-8", name: "Dr. Yusuf Ansari", specialty: "Neurology" },
  { id: "doc-9", name: "Dr. Priyanka Das", specialty: "Ophthalmology" },
  { id: "doc-10", name: "Dr. Karan Oberoi", specialty: "Dentistry" },
];
const COORDINATORS = [
  "Anjali Rawat",
  "Suresh Pillai",
  "Fatima Khan",
  "Rakesh Yadav",
  "Divya Menon",
];
const OPD_LOCATIONS = [
  "OPD 1 - Ground Floor",
  "OPD 2 - First Floor",
  "OPD 3 - Annex Wing",
  "Main OPD",
];
const VISIT_TYPES = ["New", "Follow-up"];
const GENDERS = ["Male", "Female", "Other"];
const WA_STATUS = ["delivered", "read", "sent", "pending", "failed"];
const PATIENT_STATUS = ["active", "inactive"];
const FEEDBACK_SNIPPETS = [
  "Excellent care and very attentive staff. Highly recommend this clinic.",
  "The doctor explained everything clearly. Waiting time could be shorter.",
  "Very professional experience from check-in to consultation.",
  "Loved the follow-up message, felt genuinely cared for.",
  "Good service overall, reception was a bit slow today.",
  "One of the best consultations I have had. Thank you!",
  "Doctor was kind and patient with all my questions.",
  "Clean facility and courteous staff throughout my visit.",
];

function pick(arr) {
  return arr[Math.floor(rand() * arr.length)];
}
function pickWeighted(pairs) {
  const total = pairs.reduce((s, p) => s + p[1], 0);
  let r = rand() * total;
  for (const [val, w] of pairs) {
    if (r < w) return val;
    r -= w;
  }
  return pairs[0][0];
}
function randomDate(daysBack) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(rand() * daysBack));
  d.setHours(8 + Math.floor(rand() * 10), Math.floor(rand() * 60), 0, 0);
  return d;
}
function randomPhone() {
  return "9" + Math.floor(100000000 + rand() * 899999999).toString();
}

export const doctors = DOCTORS;
export const coordinators = COORDINATORS.map((name, i) => ({
  id: `coord-${i + 1}`,
  name,
}));

export const patients = Array.from({ length: 104 }).map((_, i) => {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const doctor = pick(DOCTORS);
  const visitDate = randomDate(75);
  const status = pickWeighted([
    ["active", 0.82],
    ["inactive", 0.18],
  ]);
  const waStatus = pickWeighted([
    ["delivered", 0.28],
    ["read", 0.32],
    ["sent", 0.12],
    ["pending", 0.14],
    ["failed", 0.14],
  ]);
  const feedbackReceived =
    (waStatus === "read" || waStatus === "delivered") && rand() > 0.4;
  return {
    id: `PT-${1000 + i}`,
    name: `${first} ${last}`,
    gender: pick(GENDERS),
    age: 4 + Math.floor(rand() * 80),
    dob: null,
    mobile: randomPhone(),
    whatsapp: randomPhone(),
    email:
      rand() > 0.35
        ? `${first.toLowerCase()}.${last.toLowerCase()}@example.com`
        : "",
    doctorId: doctor.id,
    doctorName: doctor.name,
    coordinator: pick(COORDINATORS),
    opdLocation: pick(OPD_LOCATIONS),
    visitType: pick(VISIT_TYPES),
    visitDate: visitDate.toISOString(),
    status,
    whatsappStatus: waStatus,
    feedbackReceived,
    feedbackRating: feedbackReceived ? 3 + Math.floor(rand() * 3) : null,
    feedbackText: feedbackReceived ? pick(FEEDBACK_SNIPPETS) : null,
    googleReviewSubmitted: feedbackReceived && rand() > 0.45,
    automationStage: pickWeighted([
      ["completed", 0.4],
      ["awaiting_response", 0.22],
      ["message_sent", 0.16],
      ["scheduled", 0.14],
      ["failed", 0.08],
    ]),
  };
});

const TEMPLATES_LIST = ["Patient Feedback"];

export const messageLogs = Array.from({ length: 132 }).map((_, i) => {
  const patient = pick(patients);
  const sentTime = randomDate(60);
  const status = pickWeighted([
    ["delivered", 0.3],
    ["read", 0.3],
    ["sent", 0.1],
    ["pending", 0.14],
    ["failed", 0.16],
  ]);
  return {
    id: `MSG-${5000 + i}`,
    patientId: patient.id,
    patientName: patient.name,
    mobile: patient.whatsapp,
    template: pick(TEMPLATES_LIST),
    sentTime: sentTime.toISOString(),
    status,
    deliveredAt: ["delivered", "read"].includes(status)
      ? new Date(sentTime.getTime() + 1000 * 60 * 2).toISOString()
      : null,
    readAt:
      status === "read"
        ? new Date(sentTime.getTime() + 1000 * 60 * 20).toISOString()
        : null,
    failReason:
      status === "failed"
        ? pick([
            "Invalid number",
            "User opted out",
            "Session expired",
            "Network error",
          ])
        : null,
    retryCount: status === "failed" ? Math.floor(rand() * 3) : 0,
  };
});

export const feedbackRecords = patients
  .filter((p) => p.feedbackReceived)
  .slice(0, 20)
  .map((p, i) => ({
    id: `FB-${i + 1}`,
    patientId: p.id,
    patientName: p.name,
    doctorName: p.doctorName,
    rating: p.feedbackRating,
    text: p.feedbackText,
    submittedAt: p.visitDate,
    googleReviewSubmitted: p.googleReviewSubmitted,
  }));

export function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaysPatients = patients.filter(
    (p) => new Date(p.visitDate) >= today,
  ).length;
  const sent = messageLogs.length;
  const delivered = messageLogs.filter((m) =>
    ["delivered", "read"].includes(m.status),
  ).length;
  const pending = messageLogs.filter((m) => m.status === "pending").length;
  const failed = messageLogs.filter((m) => m.status === "failed").length;
  const feedback = feedbackRecords.length;
  const reviews = feedbackRecords.filter((f) => f.googleReviewSubmitted).length;
  return {
    totalPatients: patients.length,
    todaysPatients,
    messagesSent: sent,
    messagesDelivered: delivered,
    feedbackReceived: feedback,
    googleReviews: reviews,
    pendingMessages: pending,
    failedMessages: failed,
  };
}

export function getFeedbackTrend() {
  const days = 14;
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({
      date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      feedback: 3 + Math.floor(rand() * 10),
    });
  }
  return out;
}

export function getMessagesSentTrend() {
  const days = 14;
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const sent = 6 + Math.floor(rand() * 14);
    out.push({
      date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      sent,
      delivered: Math.max(0, sent - Math.floor(rand() * 3)),
    });
  }
  return out;
}

export function getReviewConversion() {
  const stats = getDashboardStats();
  const noReview = Math.max(stats.feedbackReceived - stats.googleReviews, 0);
  return [
    { name: "Google reviews", value: stats.googleReviews },
    { name: "Feedback only", value: noReview },
    {
      name: "No response",
      value: Math.max(stats.messagesDelivered - stats.feedbackReceived, 0),
    },
  ];
}

export function getRecentPatients(count = 6) {
  return [...patients]
    .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
    .slice(0, count);
}

export function getRecentFeedback(count = 5) {
  return [...feedbackRecords]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, count);
}
