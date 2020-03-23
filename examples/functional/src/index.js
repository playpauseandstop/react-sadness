import axios from "axios";
import I from "immutable";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {
  APIRequestState,
  hasData,
  hasError,
  isLoading,
  mount,
  SadnessProvider,
  useRequest
} from "react-sadness"; // eslint-disable-line import/no-unresolved

const API_URL = "http://localhost:8200/api/";

const toList = data => new I.List(data);

const Debug = ({ state, stateVar, url }) => (
  <Fragment>
    <pre>
      <code>
        const {stateVar} = useRequest(&quot;{url}&quot;)
      </code>
    </pre>
    <ul>
      <li>
        <code>isLoading({stateVar})</code>:{" "}
        <b style={{ color: "#999" }}>{JSON.stringify(isLoading(state))}</b>
      </li>
      <li>
        <code>hasError({stateVar})</code>:{" "}
        <b style={{ color: "darkred" }}>{JSON.stringify(hasError(state))}</b>
      </li>
      <li>
        <code>hasData({stateVar})</code>:{" "}
        <b style={{ color: "darkgreen" }}>{JSON.stringify(hasData(state))}</b>
      </li>
      <li>
        <code>{stateVar}.data.count()</code>:{" "}
        <b>{hasData(state) ? state.data.count() : "-"}</b>
      </li>
    </ul>
  </Fragment>
);

Debug.propTypes = {
  state: PropTypes.instanceOf(APIRequestState).isRequired,
  stateVar: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

const Projects = () => {
  const { state } = useRequest("/projects", { responseDataConverter: toList });
  return <Debug state={state} stateVar="projectsState" url="/projects" />;
};

const Talks = () => {
  const { state } = useRequest("/talks", { responseDataConverter: toList });
  return <Debug state={state} stateVar="talksState" url="/talks" />;
};

const App = () => (
  <Fragment>
    <Projects />
    <hr />
    <Talks />
  </Fragment>
);

mount(
  <SadnessProvider axios={axios.create({ baseURL: API_URL })}>
    <App />
  </SadnessProvider>,
  document.getElementById("app")
);
