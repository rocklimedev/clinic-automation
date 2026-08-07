import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[rgb(var(--bg))]">
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      <div className="relative z-10 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
