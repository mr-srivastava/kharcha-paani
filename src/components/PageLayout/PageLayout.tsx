import { type ReactNode } from 'react';
import { NavBar } from 'src/components/NavBar';
import { cn } from 'src/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  /** Show icon variant of NavBar (e.g. for landing). Default true. */
  showNavIcon?: boolean;
  /** Extra class names for the outer page wrapper. */
  className?: string;
  /** If provided, wraps children in a div with this class (e.g. standard content padding). */
  contentClassName?: string;
}

const PageLayout = ({
  children,
  showNavIcon = true,
  className,
  contentClassName,
}: PageLayoutProps) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <NavBar showIcon={showNavIcon} />
      {contentClassName ? (
        <div className={contentClassName}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
};

export { PageLayout };
