import React from "react";
import { Link } from "react-router-dom";

import { faSignInAlt, faTicketAlt, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

import Container from "react-bootstrap/Container";
import BsNavbar from "react-bootstrap/Navbar";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav";
import Logo from "./Logo";

function Navbar() {
  const leftNavLinks = [
    {
      to: "/movies",
      text: "Movies",
      icon: faTicketAlt
    },
    {
      to: "/groups",
      text: "Groups",
      icon: faUsers
    },
  ];

  const rightNavLinks = [
    {
      to: "/login",
      text: "Log in",
      icon: faSignInAlt
    },
    {
      to: "/register",
      text: "Register",
      icon: faUserPlus
    },
  ];

  return (
    <BsNavbar bg="primary" variant="dark" expand="lg" className="p-2">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          <Logo />
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <NavbarNav links={leftNavLinks} className="me-auto" />
          <NavbarNav links={rightNavLinks}>
            <NavbarSearch className="me-2" />
          </NavbarNav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
