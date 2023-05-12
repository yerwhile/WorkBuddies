import React, { useState } from 'react';
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';
import "./styles/Navbar.css"

export default function Header({ isLoggedIn, user }) {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Work Buddies</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`pack/formPack/${user?.id}`}>Form a Pack</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="pack/findPack">Find a Pack</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="vibe/findByVibe">Find Your Vibe</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`buddy/profile/${user?.id}`}>{user?.firstName}'s Profile</NavLink>
                </NavItem>
              </>
            }
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={
                      () => {
                        logout();
                        navigate("/");
                      }}
                      >(Logout)</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
      
    </div>
  );
}