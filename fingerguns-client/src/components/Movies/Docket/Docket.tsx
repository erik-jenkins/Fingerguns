import React, { useContext } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { DocketContext } from "hooks/useDocket";

import MovieCard from "../MovieCard";
import LoadingIcon, { LoadingIconSize } from "components/LoadingIcon";

function Docket() {
  const { docket, isDocketLoading } = useContext(DocketContext);

  return (
    <div className="docket d-flex justify-content-center h-100 align-items-center">
      {isDocketLoading && <LoadingIcon size={LoadingIconSize.Large} />}

      {!isDocketLoading && (
        <Row xs={1} md={2} lg={3} className="g-2">
          {docket?.movies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Docket;
