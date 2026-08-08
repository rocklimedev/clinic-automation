import { format } from "date-fns";
import { Star, Eye, Send, Trash2 } from "lucide-react";

import { Checkbox } from "../../components/ui/Checkbox";
import { Badge } from "../../components/ui/Badge";
import { StatusBadge } from "../../components/common/StatusBadge";
import { DropdownMenu, DropdownItem } from "../../components/ui/DropdownMenu";

import { formatPhone } from "@/lib/utils";

export function buildColumns({
  selectedIds,
  onToggleRow,
  onToggleAll,
  allSelected,
  onView,
  onDelete,
  onResend,
}) {
  return [
    {
      id: "select",
      enableSorting: false,

      header: () => <Checkbox checked={allSelected} onChange={onToggleAll} />,

      cell: ({ row }) => (
        <Checkbox
          checked={selectedIds.includes(row.original.id)}
          onChange={() => onToggleRow(row.original.id)}
        />
      ),
    },

    {
      id: "name",
      accessorKey: "name",
      enableSorting: true,

      header: "Patient Name",

      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>

          <span className="text-xs text-muted-foreground">
            {row.original.id}
          </span>
        </div>
      ),
    },

    {
      id: "mobile",
      accessorKey: "mobile",
      enableSorting: false,

      header: "Mobile",

      cell: ({ row }) => <span>+91 {formatPhone(row.original.mobile)}</span>,
    },

    {
      id: "doctorName",
      accessorKey: "doctorName",
      enableSorting: true,

      header: "Doctor",

      cell: ({ row }) => <span>{row.original.doctorName || "-"}</span>,
    },

    {
      id: "visitDate",
      accessorKey: "visitDate",
      enableSorting: true,

      header: "Visit Date",

      cell: ({ row }) => {
        const value = row.original.visitDate;

        if (!value) {
          return "-";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
          return "-";
        }

        return format(date, "dd MMM yyyy, h:mm a");
      },
    },

    {
      id: "visitType",
      accessorKey: "visitType",
      enableSorting: false,

      header: "Visit Type",

      cell: ({ row }) => (
        <Badge variant={row.original.visitType === "NEW" ? "brand" : "neutral"}>
          {row.original.visitType}
        </Badge>
      ),
    },

    {
      id: "status",
      accessorKey: "status",
      enableSorting: false,

      header: "Status",

      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },

    {
      id: "whatsappStatus",
      accessorKey: "whatsappStatus",
      enableSorting: false,

      header: "WhatsApp",

      cell: ({ row }) => <StatusBadge status={row.original.whatsappStatus} />,
    },

    {
      id: "feedback",
      enableSorting: false,

      header: "Feedback",

      cell: ({ row }) =>
        row.original.feedbackReceived ? (
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`
                  h-3.5 w-3.5
                  ${
                    i < row.original.feedbackRating
                      ? "fill-amber-400 text-amber-400"
                      : "text-[rgb(var(--border-strong))]"
                  }
                  `}
              />
            ))}
          </div>
        ) : (
          <span>—</span>
        ),
    },

    {
      id: "actions",

      enableSorting: false,

      header: "",

      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu
            trigger={
              <button
                className="
                p-2
                rounded-md
                hover:bg-muted
                "
              >
                ⋮
              </button>
            }
          >
            <DropdownItem icon={Eye} onClick={() => onView(row.original)}>
              View details
            </DropdownItem>

            <DropdownItem icon={Send} onClick={() => onResend(row.original)}>
              Resend WhatsApp
            </DropdownItem>

            <DropdownItem
              icon={Trash2}
              className="text-red-600"
              onClick={() => onDelete(row.original)}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </div>
      ),
    },
  ];
}
