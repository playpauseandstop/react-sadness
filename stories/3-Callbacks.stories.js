import { action } from "@storybook/addon-actions";
import React, { Fragment } from "react";

import ProjectsList from "./components/ProjectsList";
import { API_URL } from "./settings";

import { Response, SadnessProvider, useRequest } from "../src";

const FAKE_PROJECTS = [
  { slug: "project-1", title: "Project 1" },
  { slug: "project-2", title: "Project 2" },
  { slug: "project-3", title: "Project 3" }
];
const FAKE_RESPONSE = { data: FAKE_PROJECTS, status: 200 };

const Projects = () => {
  const { response, onReload, onUpdate } = useRequest(`${API_URL}projects`);
  return (
    <Fragment>
      <h2>
        Projects —{" "}
        <button
          onClick={evt => {
            evt.preventDefault();
            action("Reload Data Requested")(evt);
            onReload();
          }}
          type="button"
        >
          Reload Data
        </button>{" "}
        <button
          onClick={evt => {
            evt.preventDefault();
            action("Full Reload Data Requested")(evt);
            onReload(true);
          }}
          type="button"
        >
          Full Reload Data
        </button>{" "}
        <button
          onClick={evt => {
            evt.preventDefault();
            action("Setting Fake Data")(evt);
            onUpdate(FAKE_RESPONSE);
          }}
          type="button"
        >
          Set Fake Data
        </button>
      </h2>
      <Response data={response}>
        {projects => <ProjectsList data={projects} />}
      </Response>
    </Fragment>
  );
};

export const App = () => (
  <SadnessProvider>
    <Projects />
  </SadnessProvider>
);

export default {
  title: "Callbacks"
};
