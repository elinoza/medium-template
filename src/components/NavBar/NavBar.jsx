import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  Container,
  Image,
  Button,
} from "react-bootstrap";
import logo from "../../assets/medium_logo.svg";
import {
  IoNotificationsOutline,
  IoBookmarksOutline,
  IoSearchOutline,
} from "react-icons/io5";
export default class NavBar extends Component {
  render() {
    return (
      <Navbar  style={{paddingTop:24}}>
        <Container>
          <Navbar.Brand href="#home">
            <img style={{ height: 54 }} alt="medium-logo" src={logo} />
          </Navbar.Brand>
          <h5 style={{ fontWeight: "bold", marginTop: "0.6em" }}>
            Good Morning
          </h5>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">
                <IoSearchOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#home">
                <IoBookmarksOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#link" className="medium-icon">
                <IoNotificationsOutline style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="#link" className="medium-icon">
                <Button variant="outline-secondary">Upgrade</Button>
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="success" as="div">
                  <Image
                    style={{ height: 30 }}
                    src="https://strive.school/favicon.ico"
                    roundedCircle
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Write a story</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                   Stories
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                   Stats
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                   Reading list
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
