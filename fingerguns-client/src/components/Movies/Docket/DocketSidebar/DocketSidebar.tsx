import React from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";

function DocketSidebar() {
  return (
    <div className="docket-sidebar">
      <h1>Docket</h1>
      <div className="d-grid gap-2 mb-2">
        <Button variant="primary">Select Movie</Button>
      </div>
      <hr />
      <InputGroup>
        <FormControl type="text" placeholder="Search movies" />
        <Button variant="primary">Add</Button>
      </InputGroup>
      <hr />
      <div>
        <small className="text-muted">Invite friends to this docket!</small>
        <InputGroup size="sm">
          <FormControl
            type="text"
            disabled
            className="text-muted"
            value="http://fingerguns.com/dockets/ojoasd8"
          />
          <Button variant="primary">Copy</Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default DocketSidebar;
