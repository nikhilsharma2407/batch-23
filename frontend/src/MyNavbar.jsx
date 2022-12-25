import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from "react-router-dom"
import { logoutUtil } from './apiUtil';
import { logoutAction } from './reducers/userReducer';

function MyNavBar() {
  const {username} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [, setURLSearchParams] = useSearchParams();

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/flex">Flex</Nav.Link>
            <Nav.Link as={Link} to="/route/123">Route</Nav.Link>
            <Nav.Link as={Link} to="/count">Counter</Nav.Link>

          </Nav>
          <Nav className='ms-auto'>
            {username ? <Nav.Link variant="secondary-outline" as={Button} onClick={e => dispatch(logoutAction())}>Logout</Nav.Link> : <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={e => setURLSearchParams({ 'search': e.target.value.toLowerCase() })}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;