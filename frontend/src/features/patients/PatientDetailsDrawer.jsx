import { format } from "date-fns";
import { Drawer } from "../../components/ui/Drawer";
import { Avatar } from "../../components/ui/Avatar";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Badge } from "../../components/ui/Badge";
import { Timeline } from "../../components/common/Timeline";
import { formatPhone } from "@/lib/utils";
import {
  CalendarCheck,
  Clock,
  Send,
  MessageCircleReply,
  Sparkles,
  Star,
  Phone,
  Mail,
  Stethoscope,
  MapPin,
  User,
} from "lucide-react";

const AUTOMATION_STEPS = [
  "scheduled",
  "message_sent",
  "awaiting_response",
  "completed",
];

function buildTimeline(patient) {
  const visitTime = format(new Date(patient.visitDate), "dd MMM, h:mm a");
  const currentIdx = AUTOMATION_STEPS.indexOf(patient.automationStage);
  const failed = patient.automationStage === "failed";

  return [
    {
      title: "Visit completed",
      description: `Consultation with ${patient.doctorName}`,
      timestamp: visitTime,
      icon: CalendarCheck,
      done: true,
    },
    {
      title: "Wait window (2h)",
      description: "Automation buffer before first outreach",
      icon: Clock,
      done: currentIdx > 0 || failed,
    },
    {
      title: "WhatsApp message sent",
      description: "Patient Feedback template delivered",
      icon: Send,
      done: currentIdx > 1,
      active: currentIdx === 1,
    },
    {
      title: "Awaiting response",
      description: "Waiting on patient to reply or leave feedback",
      icon: MessageCircleReply,
      done: currentIdx > 2,
      active: currentIdx === 2,
    },
    {
      title: failed ? "Automation failed" : "Completed",
      description: failed
        ? "Message could not be delivered"
        : "Feedback collected, flow closed",
      icon: Sparkles,
      done: currentIdx === 3,
      active: failed,
    },
  ];
}

export function PatientDetailsDrawer({ patient, open, onClose }) {
  if (!patient) return null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width="max-w-xl"
      title="Patient details"
      subtitle={patient.id}
    >
      <div className="flex items-center gap-4">
        <Avatar name={patient.name} size="lg" />
        <div>
          <p className="text-base font-semibold text-[rgb(var(--fg))]">
            {patient.name}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={patient.status} />
            <Badge variant={patient.visitType === "New" ? "brand" : "neutral"}>
              {patient.visitType}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[rgb(var(--border))] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted-fg))]">
            Patient information
          </p>
          <dl className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2 text-[rgb(var(--fg))]">
              <Phone className="h-3.5 w-3.5 text-[rgb(var(--muted-fg))]" /> +91{" "}
              {formatPhone(patient.mobile)}
            </div>
            {patient.email && (
              <div className="flex items-center gap-2 text-[rgb(var(--fg))]">
                <Mail className="h-3.5 w-3.5 text-[rgb(var(--muted-fg))]" />{" "}
                {patient.email}
              </div>
            )}
            <div className="flex items-center gap-2 text-[rgb(var(--fg))]">
              <User className="h-3.5 w-3.5 text-[rgb(var(--muted-fg))]" />{" "}
              {patient.gender}, {patient.age} yrs
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-[rgb(var(--border))] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted-fg))]">
            Visit information
          </p>
          <dl className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2 text-[rgb(var(--fg))]">
              <Stethoscope className="h-3.5 w-3.5 text-[rgb(var(--muted-fg))]" />{" "}
              {patient.doctorName}
            </div>
            <div className="flex items-center gap-2 text-[rgb(var(--fg))]">
              <MapPin className="h-3.5 w-3.5 text-[rgb(var(--muted-fg))]" />{" "}
              {patient.opdLocation}
            </div>
            <div className="flex items-center gap-2 text-[rgb(var(--fg))]">
              <CalendarCheck className="h-3.5 w-3.5 text-[rgb(var(--muted-fg))]" />{" "}
              {format(new Date(patient.visitDate), "dd MMM yyyy, h:mm a")}
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[rgb(var(--border))] p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted-fg))]">
            Automation &amp; WhatsApp status
          </p>
          <StatusBadge status={patient.whatsappStatus} />
        </div>
        <p className="mt-2 text-sm text-[rgb(var(--fg))]">
          Coordinator:{" "}
          <span className="font-medium">{patient.coordinator}</span>
        </p>
      </div>

      <div className="mt-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted-fg))]">
          Timeline
        </p>
        <Timeline items={buildTimeline(patient)} />
      </div>

      {patient.feedbackReceived ? (
        <div className="mt-6 rounded-xl border border-[rgb(var(--border))] bg-brand-50/60 p-4 dark:bg-brand-900/10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted-fg))]">
              Feedback
            </p>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < patient.feedbackRating ? "fill-amber-400 text-amber-400" : "text-[rgb(var(--border-strong))]"}`}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-[rgb(var(--fg))]">
            {patient.feedbackText}
          </p>
          {patient.googleReviewSubmitted && (
            <Badge variant="success" className="mt-3">
              Google review submitted
            </Badge>
          )}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-[rgb(var(--border-strong))] p-4 text-center">
          <p className="text-sm text-[rgb(var(--muted-fg))]">
            No feedback received yet
          </p>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-[rgb(var(--border))] p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted-fg))]">
          Future activity
        </p>
        <p className="text-sm text-[rgb(var(--muted-fg))]">
          Next scheduled touchpoint: follow-up satisfaction check in 30 days
          (coming soon with multi-step automations).
        </p>
      </div>
    </Drawer>
  );
}
