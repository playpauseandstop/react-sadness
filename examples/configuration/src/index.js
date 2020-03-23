import axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {
  mount,
  Response,
  SadnessConfig,
  SadnessProvider,
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
  const apiUrl = `${API_URL}projects`;
  const { response } = useRequest(apiUrl, { isCacheResponse: false });
  return (
    <Fragment>
      <h2>Projects</h2>
      <pre>
        <code>{`const Projects = () => {
  const apiUrl = "${API_URL}projects";
  const { response } = useRequest(apiUrl, { isCacheResponse: false });
  ...
}`}</code>
      </pre>
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
  const { response } = useRequest(`${API_URL}talks`);
  return (
    <Fragment>
      <h2>Talks</h2>
      <pre>
        <code>{`<SadnessConfig
  axios={axios.create({ baseURL: "${API_URL}" })}
  isCacheResponses={false}
>
  <Talks />
</SadnessConfig>`}</code>
      </pre>
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
  <Fragment>
    <Projects />
    <hr />
    <SadnessConfig
      axios={axios.create({ baseURL: API_URL })}
      isCacheResponses={false}
    >
      <Talks />
    </SadnessConfig>
  </Fragment>
);

mount(
  <SadnessProvider readyEvent="ready-event">
    <App />
  </SadnessProvider>,
  document.getElementById("app")
);
