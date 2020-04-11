import axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { API_URL } from "./settings";

import {
  isLoading,
  hasData,
  hasError,
  ResponseRecord,
  SadnessProvider,
  useRequest,
} from "../src";

const Debug = ({ response }) => (
  <ul>
    <li>
      <code>isLoading(response)</code>:{" "}
      <b style={{ color: "#999" }}>{JSON.stringify(isLoading(response))}</b>
    </li>
    <li>
      <code>hasError(response)</code>:{" "}
      <b style={{ color: "darkred" }}>{JSON.stringify(hasError(response))}</b>
    </li>
    <li>
      <code>hasData(response)</code>:{" "}
      <b style={{ color: "darkgreen" }}>{JSON.stringify(hasData(response))}</b>
    </li>
    <li>
      <code>response.data.length</code>:{" "}
      <b>{hasData(response) ? response.data.length : "-"}</b>
    </li>
  </ul>
);

Debug.propTypes = {
  response: PropTypes.instanceOf(ResponseRecord).isRequired,
};

const Request = ({ apiUrl, children }) => {
  const { response } = useRequest(apiUrl);
  return (
    <Fragment>
      <h2>{children}</h2>
      <Debug response={response} />
    </Fragment>
  );
};

Request.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export const Projects = () => (
  <SadnessProvider axios={axios.create({ baseURL: API_URL })}>
    <Request apiUrl="projects">Projects</Request>
  </SadnessProvider>
);

export const Talks = () => (
  <SadnessProvider>
    <Request apiUrl={`${API_URL}talks`}>Talks</Request>
  </SadnessProvider>
);

export default {
  title: "Functional",
};
