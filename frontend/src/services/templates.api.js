import { delay } from "./client";

const DEFAULT_TEMPLATE = {
  id: "tmpl-1",
  name: "Patient Feedback",
  category: "Utility",
  language: "English",
  status: "Approved",
  isDefault: true,
  body: "Thank you for visiting Dr. {{doctor_name}} today.\n\nWe hope your consultation was helpful and that all your concerns were addressed.\n\nYour feedback means a lot to us and helps us continue providing the best possible care.\n\nIf you have a moment, we'd be grateful if you could share your experience on Google.\n\n\u2b50 Leave a Review:\n{{google_review_link}}\n\nThank you for your trust and we wish you good health.",
  variables: ["doctor_name", "google_review_link"],
};

const templates = [
  DEFAULT_TEMPLATE,
  {
    id: "tmpl-2",
    name: "Appointment Reminder",
    category: "Utility",
    language: "English",
    status: "Draft",
    isDefault: false,
    body: "Hi {{patient_name}}, this is a reminder for your appointment with Dr. {{doctor_name}} on {{visit_date}}.",
    variables: ["patient_name", "doctor_name", "visit_date"],
  },
  {
    id: "tmpl-3",
    name: "Follow-up Check-in",
    category: "Marketing",
    language: "English",
    status: "Pending Review",
    isDefault: false,
    body: "Hi {{patient_name}}, how are you feeling after your recent visit? Reply to let us know if you need anything.",
    variables: ["patient_name"],
  },
];

export const templatesApi = {
  list: () => delay(templates),
};
