import React from "react";


import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import SelectMovie from "./SelectMovie";

function DocketSidebar() {

  return (
    <div className="docket-sidebar">
      <h1>Docket</h1>
      <SelectMovie />
      <hr />
      <FormControl type="text" placeholder="Search movies" />
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
