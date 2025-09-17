import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <BrainCircuit className="h-7 w-7 text-sidebar-primary" />
      {!iconOnly && (
        <span className="font-headline text-xl font-bold text-sidebar-foreground">
          Visionary Ventures
        </span>
      )}
    </div>
  );
}
