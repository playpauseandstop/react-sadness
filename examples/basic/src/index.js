import axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {
  APIResponse,
  mount,
  SadnessProvider,
  useAPIRequest
} from "react-sadness"; // eslint-disable-line import/no-unresolved

const API_URL = "http://localhost:8200/api/";
const UI_URL = "https://igordavydenko.com";

const Project = ({ data }) => (
  <li>
    <a href={`${UI_URL}/projects/#${data.slug}`}>{data.title}</a>
  </li>
);

Project.propTypes = {
  data: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

const Projects = () => {
  const { state } = useAPIRequest("/projects");
  return (
    <Fragment>
      <h2>Projects</h2>
      <APIResponse state={state}>
        {data => (
          <ul>
            {data.map(item => (
              <Project data={item} key={item.slug} />
            ))}
          </ul>
        )}
      </APIResponse>
    </Fragment>
  );
};

const Talk = ({ data }) => (
  <li>
    <b>{data.event.title}:</b>{" "}
    <a href={`${UI_URL}/talks/#${data.slug}`}>{data.title}</a>
  </li>
);

Talk.propTypes = {
  data: PropTypes.shape({
    event: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

const Talks = () => {
  const { state } = useAPIRequest("/talks");
  return (
    <Fragment>
      <h2>Talks</h2>
      <APIResponse state={state}>
        {data => (
          <ul>
            {data.map(item => (
              <Talk data={item} key={item.slug} />
            ))}
          </ul>
        )}
      </APIResponse>
    </Fragment>
  );
};

const App = () => (
  <Fragment>
    <Projects />
    <hr />
    <Talks />
  </Fragment>
);

mount(
  <SadnessProvider
    axios={axios.create({ baseURL: API_URL })}
    isCacheResponses={false}
    isTriggerPrerenderEvent={false}
  >
    <App />
  </SadnessProvider>,
  document.getElementById("app")
);
