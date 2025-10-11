type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">{description}</p>
    </div>
  );
}
