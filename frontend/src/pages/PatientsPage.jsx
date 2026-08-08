import { useRef, useState } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { PatientsToolbar } from "../features/patients/PatientsToolbar";
import { PatientsTable } from "../features/patients/PatientsTable";
import { PatientFormModal } from "../features/patients/PatientFormModal";
import { PatientDetailsDrawer } from "../features/patients/PatientDetailsDrawer";
import { ImportPatientsModal } from "../features/patients/ImportPatientsModal";
import { Toast } from "../components/common/Toast";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [visitType, setVisitType] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [activePatient, setActivePatient] = useState(null);
  const [toast, setToast] = useState(null);
  const exportRef = useRef(() => {});

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="Manage patient visits and their feedback automation status"
      />

      <PatientsToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        visitType={visitType}
        onVisitTypeChange={setVisitType}
        selectedCount={0}
        onAddPatient={() => setAddOpen(true)}
        onImport={() => setImportOpen(true)}
        onExport={() => exportRef.current()}
      />

      <PatientsTable
        search={search}
        status={status}
        visitType={visitType}
        onView={setActivePatient}
        onNotify={(msg) => setToast(msg)}
        registerExport={(fn) => (exportRef.current = fn)}
      />

      <PatientFormModal open={addOpen} onClose={() => setAddOpen(false)} />
      <ImportPatientsModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
      />
      <PatientDetailsDrawer
        patient={activePatient}
        open={!!activePatient}
        onClose={() => setActivePatient(null)}
      />
      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
