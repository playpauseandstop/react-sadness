import axios from "axios";
import React, { Fragment } from "react";

import ProjectsList from "./components/ProjectsList";
import { API_URL } from "./settings";

import { Response, SadnessConfig, SadnessProvider, useRequest } from "../src";

const Projects = () => {
  const { response } = useRequest(`${API_URL}projects`);
  return (
    <Fragment>
      <h2>Projects</h2>
      <Response data={response}>
        {projects => <ProjectsList data={projects} />}
      </Response>
    </Fragment>
  );
};

export const Provider = () => (
  <SadnessProvider>
    <Projects />
  </SadnessProvider>
);

export const Config = () => (
  // `SadnessProvider` component provide default axios instance to use, but
  // when component is wrapped with `SadnessConfig`` component only, it is
  // required to explicitly pass axios instance to use
  <SadnessConfig axios={axios.create({ baseURL: API_URL })}>
    <Projects />
  </SadnessConfig>
);

export default {
  title: "Basic"
};
