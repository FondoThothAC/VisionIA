import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PageHeaderProps = {
  title: React.ReactNode;
  description: string;
  projectSelector?: React.ReactNode;
  author?: string;
  aiModel?: string;
};

export default function PageHeader({ title, description, projectSelector, author, aiModel }: PageHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {projectSelector && (
              <div className="font-bold text-lg text-foreground">
                  {projectSelector}
              </div>
          )}
          {author && <span>Autor: <strong>{author}</strong></span>}
          {aiModel && (
            <span>
              Modelo IA: <strong>{aiModel}</strong>
            </span>
          )}
      </div>

      <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground mt-2">
        {title}
      </h1>
      <p className="mt-1 text-lg text-muted-foreground">{description}</p>
    </div>
  );
}
