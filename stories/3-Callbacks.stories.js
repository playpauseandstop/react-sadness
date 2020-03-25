import { action } from "@storybook/addon-actions";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

import ProjectsList from "./components/ProjectsList";
import { API_URL } from "./settings";

import { Response, SadnessProvider, useRequest } from "../src";

const FAKE_PROJECTS = [
  { slug: "project-1", title: "Project 1" },
  { slug: "project-2", title: "Project 2" },
  { slug: "project-3", title: "Project 3" }
];
const FAKE_RESPONSE = { data: FAKE_PROJECTS, status: 200 };

const RequestCallbacks = ({ counter }) => {
  useRequest(`${API_URL}projects`, {
    deps: [counter],
    onErrorResponse: (request, err) => {
      action("Error Response")(counter, request, err);
    },
    onSuccessResponse: (request, response) => {
      action("Success Response")(counter, request, response);
    }
  });
  return (
    <p>
      Check <b>Actions</b> Tab
    </p>
  );
};

RequestCallbacks.propTypes = {
  counter: PropTypes.number.isRequired
};

const RequestCallbacksContainer = () => {
  const [counter, setCounter] = useState(0);
  return (
    <Fragment>
      <h2>Request Callbacks</h2>
      <p>
        Click on button to initiate new API request:{" "}
        <button
          onClick={evt => {
            evt.preventDefault();
            action("Button Clicked")(evt);
            setCounter(current => current + 1);
          }}
          type="button"
        >
          Click Me ({counter})
        </button>
      </p>
      <RequestCallbacks counter={counter} />
    </Fragment>
  );
};

const ResponseCallbacks = () => {
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

export const RequestCallbacksApp = () => (
  <SadnessProvider>
    <RequestCallbacksContainer />
  </SadnessProvider>
);

RequestCallbacksApp.story = {
  name: "Request Callbacks"
};

export const ResponseCallbacksApp = () => (
  <SadnessProvider>
    <ResponseCallbacks />
  </SadnessProvider>
);

ResponseCallbacksApp.story = {
  name: "Response Callbacks"
};

export default {
  title: "Callbacks"
};
