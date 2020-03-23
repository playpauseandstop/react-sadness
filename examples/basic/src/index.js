import axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {
  mount,
  Response,
  SadnessProvider,
  SadnessReady,
  useRequest
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
  const { response } = useRequest("/projects");
  return (
    <Fragment>
      <h2>Projects</h2>
      <Response data={response}>
        {projects => (
          <ul>
            {projects.map(item => (
              <Project data={item} key={item.slug} />
            ))}
          </ul>
        )}
      </Response>
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
  const { response } = useRequest("/talks", { isCacheResponse: false });
  return (
    <Fragment>
      <h2>Talks</h2>
      <Response data={response}>
        {talks => (
          <ul>
            {talks.map(item => (
              <Talk data={item} key={item.slug} />
            ))}
          </ul>
        )}
      </Response>
    </Fragment>
  );
};

const App = () => (
  <SadnessReady>
    <Projects />
    <hr />
    <Talks />
  </SadnessReady>
);

mount(
  <SadnessProvider axios={axios.create({ baseURL: API_URL })}>
    <App />
  </SadnessProvider>,
  document.getElementById("app")
);
