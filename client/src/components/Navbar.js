import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"

import { NavLink } from 'react-router-dom'

function NavBar() {

  const { user, isAuthenticated} = useAuth0();
  const [searchParams, setSearchParams] = useState();

  let navigate = useNavigate(); 

  function handleOnChange(event){
    event.preventDefault();
    setSearchParams(event.target.value);
    console.log(searchParams);
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(searchParams)
    let path = `SearchPage/${searchParams}`; 
    navigate(path);
  }

  return (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Group controlId="searchBar">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange = {handleOnChange}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          {isAuthenticated && <Nav.Link class="dashboard--link" href="/UserPage" >Your Dashboard</Nav.Link>}
          {isAuthenticated ?   <LogoutButton /> : <LoginButton />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 

    
  );
}

export default NavBar;