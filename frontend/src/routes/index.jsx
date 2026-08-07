import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import PatientsPage from "@/pages/PatientsPage";
import TemplatesPage from "@/pages/TemplatesPage";
import AutomationsPage from "@/pages/AutomationsPage";
import LogsPage from "@/pages/LogsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import UsersPage from "../pages/UsersPage";
import LoginPage from "../pages/LoginPage";
import { AuthLayout } from "../components/layout/AuthLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "automations", element: <AutomationsPage /> },
      { path: "logs", element: <LogsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
