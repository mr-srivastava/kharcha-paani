import { Navbar, Container } from 'react-bootstrap';
import './NavBar.scss';

function NavBar(props: any) {
  const { showIcon } = props;
  return (
    <Navbar className="navbar-wrapper">
      <Container className="navbar-container">
        <Navbar.Brand href="/">
          <div className="header">
            {showIcon ? (
              <>
                <span>K</span>P
              </>
            ) : (
              <>
                <span>Kharcha</span>Paani
              </>
            )}
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
export { NavBar };
