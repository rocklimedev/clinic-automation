import {
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  XCircle,
  Eye,
  RotateCw,
} from "lucide-react";

const logs = [
  {
    id: 1,
    patient: "Rahul Sharma",
    doctor: "Dr. Yogesh Chhabra",
    template: "Patient Feedback",
    sentAt: "07 Aug 2026, 10:30 AM",
    status: "Delivered",
  },
  {
    id: 2,
    patient: "Aman Gupta",
    doctor: "Dr. Yogesh Chhabra",
    template: "Patient Feedback",
    sentAt: "07 Aug 2026, 10:10 AM",
    status: "Read",
  },
  {
    id: 3,
    patient: "Pooja Singh",
    doctor: "Dr. Yogesh Chhabra",
    template: "Patient Feedback",
    sentAt: "07 Aug 2026, 09:45 AM",
    status: "Pending",
  },
  {
    id: 4,
    patient: "Neha Verma",
    doctor: "Dr. Yogesh Chhabra",
    template: "Patient Feedback",
    sentAt: "07 Aug 2026, 09:15 AM",
    status: "Failed",
  },
];

export default function LogsPage() {
  return (
    <div className="space-y-8 animate-[var(--animate-in)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Message Logs</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Monitor every WhatsApp message sent through your automation.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-5">
        <StatCard title="Sent" value="1,284" />
        <StatCard title="Delivered" value="1,241" />
        <StatCard title="Read" value="1,109" />
        <StatCard title="Pending" value="18" />
        <StatCard title="Failed" value="25" danger />
      </div>

      <div className="rounded-2xl border bg-white shadow-soft-md">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b p-6">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />

            <input
              placeholder="Search patient..."
              className="w-full rounded-lg border pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>

          <button className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-zinc-50">
            <Filter size={16} />
            Filters
          </button>
        </div>

        <table className="w-full">
          <thead className="border-b bg-zinc-50 text-left text-sm">
            <tr>
              <th className="px-6 py-4">Patient</th>
              <th>Doctor</th>
              <th>Template</th>
              <th>Sent At</th>
              <th>Status</th>
              <th className="text-right pr-6">Action</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-zinc-50 transition">
                <td className="px-6 py-4 font-medium">{log.patient}</td>

                <td>{log.doctor}</td>

                <td>{log.template}</td>

                <td>{log.sentAt}</td>

                <td>
                  <StatusBadge status={log.status} />
                </td>

                <td className="pr-6">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-lg border p-2 hover:bg-zinc-100">
                      <Eye size={16} />
                    </button>

                    {log.status === "Failed" && (
                      <button className="rounded-lg border p-2 hover:bg-zinc-100">
                        <RotateCw size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, danger }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-soft">
      <div className="text-sm text-zinc-500">{title}</div>

      <div
        className={`mt-2 text-3xl font-semibold ${
          danger ? "text-red-600" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Delivered: {
      icon: <CheckCircle2 size={14} />,
      className: "bg-blue-100 text-blue-700",
    },
    Read: {
      icon: <CheckCircle2 size={14} />,
      className: "bg-green-100 text-green-700",
    },
    Pending: {
      icon: <Clock3 size={14} />,
      className: "bg-yellow-100 text-yellow-700",
    },
    Failed: {
      icon: <XCircle size={14} />,
      className: "bg-red-100 text-red-700",
    },
  };

  const item = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${item.className}`}
    >
      {item.icon}
      {status}
    </span>
  );
}
