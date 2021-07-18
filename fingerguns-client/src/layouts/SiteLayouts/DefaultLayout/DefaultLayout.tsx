import React from "react";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import Router from "routes";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

import "./DefaultLayout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

function DefaultLayout() {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main>
        <Container>
          <Alert variant="secondary">
            Fingerguns is still under development - expect bugs!{" "}
            <FontAwesomeIcon icon={faBug} />
          </Alert>
          <Router />
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default React.memo(DefaultLayout);
