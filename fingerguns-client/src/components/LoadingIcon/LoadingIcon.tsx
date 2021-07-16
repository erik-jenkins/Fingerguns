import React from "react";

import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./LoadingIcon.module.scss";

export enum LoadingIconSize {
  Small = "fa-lg",
  Medium = "fa-3x",
  Large = "fa-5x",
}

interface LoadingIconProps {
  size: LoadingIconSize;
}

function LoadingIcon({size}: LoadingIconProps) {
  return (
    <FontAwesomeIcon
      icon={faHandPointRight}
      className={`text-secondary ${size} ${styles.loadingIcon}`}
    />
  );
}

LoadingIcon.defaultProps = {
  size: LoadingIconSize.Medium
}

export default LoadingIcon;
