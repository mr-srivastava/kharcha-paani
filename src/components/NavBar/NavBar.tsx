import { Link, NavLink } from 'react-router-dom';

interface NavBarProps {
  showIcon?: boolean;
}

function NavBar(props: NavBarProps) {
  const { showIcon } = props;
  const isLanding = showIcon;

  if (isLanding) {
    return (
      <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-white">
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl outline-none"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md group-hover:bg-white/10 transition-all duration-300">
            <span className="font-serif font-bold text-2xl text-primary">K</span>
            <span className="font-serif font-bold text-2xl text-foreground">P</span>
          </div>
          <span className="hidden sm:block font-sans text-lg font-medium text-muted-foreground tracking-tight group-hover:text-foreground transition-colors">
            KharchaPaani
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'text-foreground bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/groups"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'text-foreground bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`
            }
          >
            Groups
          </NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-md border-b border-border">
      <div className="w-full flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="font-righteous text-[29px] text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded"
        >
          <span className="text-primary">Kharcha</span>Paani
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-muted-foreground hover:text-foreground font-medium transition-all duration-200 ease-smooth relative py-2 px-3 rounded-md hover:bg-white/10 ${isActive ? 'text-primary bg-white/5' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
          <NavLink
            to="/groups"
            className={({ isActive }) =>
              `text-muted-foreground hover:text-foreground font-medium transition-all duration-200 ease-smooth relative py-2 px-3 rounded-md hover:bg-white/10 ${isActive ? 'text-primary bg-white/5' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Groups
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </nav>
  );
}
export { NavBar };
