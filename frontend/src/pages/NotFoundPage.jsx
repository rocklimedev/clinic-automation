import { Link } from "react-router-dom";
import { CompassIcon } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/30">
        <CompassIcon className="h-6 w-6" />
      </div>
      <p className="font-display text-5xl font-semibold tracking-tight text-[rgb(var(--fg))]">
        404
      </p>
      <p className="mt-2 text-[15px] font-medium text-[rgb(var(--fg))]">
        This page took a wrong turn
      </p>
      <p className="mt-1 max-w-sm text-sm text-[rgb(var(--muted-fg))]">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
