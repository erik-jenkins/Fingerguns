import React from "react";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import "./NavbarSearch.scss";

interface NavbarSearchProps {
  className?: string;
}

function NavbarSearch({className}: NavbarSearchProps) {
  return (
    <Form className={`d-flex ${className}`}>
      <FormControl
        type="text"
        placeholder="Search movies, groups, and more"
        className="search-movies"
        size="sm"
        aria-label="Search"
      />
    </Form>
  );
}

NavbarSearch.defaultProps = {
  className: ""
}

export default NavbarSearch;
