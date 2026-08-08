import { useQuery } from "@tanstack/react-query";
import { templatesApi } from "../../services/templates.api";
import { TemplateCard } from "./TemplateCard";
import { Skeleton } from "../../components/ui/Skeleton";

export function TemplatesGrid() {
  const { data: templates, isLoading } = useQuery({
    queryKey: ["templates"],
    queryFn: templatesApi.list,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} />
      ))}
    </div>
  );
}
