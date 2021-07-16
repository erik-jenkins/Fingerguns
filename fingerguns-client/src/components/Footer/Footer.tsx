import React from "react";

import Container from "react-bootstrap/Container";

import "./Footer.scss";

function Footer() {
  return (
    <div className="footer border-top">
      <Container className="d-flex justify-content-between">
        <span className="text-muted"><em>Insert movie quote here.</em></span>
        <span className="text-muted">Copyright 2021</span>
      </Container>
    </div>
  );
}

export default Footer;
