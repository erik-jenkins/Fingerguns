import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

import "./Logo.scss";

function Logo() {
  return (
    <span>
      <FontAwesomeIcon icon={faHandPointRight} className="logo fa-2x" />
    </span>
  );
}

export default Logo;
