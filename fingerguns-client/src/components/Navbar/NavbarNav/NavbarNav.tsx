import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Nav } from "react-bootstrap";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavbarNavLink {
  to: string;
  text: string;
  icon?: IconDefinition;
}

interface NavbarNavProps {
  links: NavbarNavLink[];
  className?: string;
  shouldPlaceChildrenBefore?: boolean;
}

const NavbarNav: React.FC<NavbarNavProps> = ({
  links,
  className,
  shouldPlaceChildrenBefore,
  children,
}) => {
  const location = useLocation();
  const isActive = (href: string) => location.pathname.includes(href);

  return (
    <Nav className={className}>
      {shouldPlaceChildrenBefore && children}
      {links.map((link) => (
        <Nav.Link
          as={Link}
          to={link.to}
          key={link.to}
          active={isActive(link.to)}
        >
          {link.icon && (
            <FontAwesomeIcon icon={link.icon} className="fa-sm me-2" />
          )}
          {link.text}
        </Nav.Link>
      ))}
      {!shouldPlaceChildrenBefore && children}
    </Nav>
  );
};

NavbarNav.defaultProps = {
  links: [],
  className: "",
  shouldPlaceChildrenBefore: true,
};

export default NavbarNav;
