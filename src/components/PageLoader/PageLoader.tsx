import { Loader2 } from 'lucide-react';

interface PageLoaderProps {
  page: string;
}

export function PageLoader({ page }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" aria-hidden />
      <div className="text-muted-foreground">{`Loading ${page}...`}</div>
    </div>
  );
}
