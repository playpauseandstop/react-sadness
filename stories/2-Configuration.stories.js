import axios from "axios";
import PropTypes from "prop-types";
import React from "react";

import ProjectsList from "./components/ProjectsList";
import { API_URL } from "./settings";

import { Response, SadnessConfig, SadnessProvider, useRequest } from "../src";

const Projects = ({ isCacheResponse }) => {
  const { response } = useRequest("/projects", { isCacheResponse });
  return (
    <Response data={response}>
      {projects => <ProjectsList data={projects} />}
    </Response>
  );
};

Projects.defaultProps = {
  isCacheResponse: true
};

Projects.propTypes = {
  isCacheResponse: PropTypes.bool
};

export const App = () => (
  <SadnessProvider
    axios={axios.create({ baseURL: API_URL })}
    loadingMessage="Loading data"
  >
    <SadnessConfig isCacheResponses={false} loadingMessage="Loading projects">
      <Projects />
    </SadnessConfig>

    <hr />

    <Projects isCacheResponse={false} />
  </SadnessProvider>
);

export default {
  title: "Configuration"
};
