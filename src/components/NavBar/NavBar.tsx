import { Navbar, Container, Nav } from 'react-bootstrap';
import './NavBar.scss';

function NavBar(props: any) {
  const { showIcon } = props;
  return (
    <Navbar className="navbar-wrapper">
      <Container className="navbar-container d-flex justify-content-between">
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
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/groups">Groups</Nav.Link>
          {/* <Nav.Link className="text-white" href="#pricing">
            Pricing
          </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
export { NavBar };
