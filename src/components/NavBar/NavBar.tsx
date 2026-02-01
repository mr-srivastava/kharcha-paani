import { Link } from 'react-router-dom';

interface NavBarProps {
  showIcon?: boolean;
}

function NavBar(props: NavBarProps) {
  const { showIcon } = props;
  return (
    <nav className="bg-blue-dark shadow-md">
      <div className="w-full flex justify-between items-center px-4 py-3">
        <Link to="/" className="font-righteous text-[29px] text-gray-200">
          {showIcon ? (
            <>
              <span className="text-green-primary">K</span>P
            </>
          ) : (
            <>
              <span className="text-green-primary">Kharcha</span>Paani
            </>
          )}
        </Link>
        <nav className="flex gap-4">
          <Link
            to="/"
            className="text-gray-200 hover:text-white hover:font-semibold transition-colors"
          >
            Home
          </Link>
          <Link
            to="/groups"
            className="text-gray-200 hover:text-white hover:font-semibold transition-colors"
          >
            Groups
          </Link>
        </nav>
      </div>
    </nav>
  );
}
export { NavBar };
