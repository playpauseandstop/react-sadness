import { action } from "@storybook/addon-actions";
import axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

import { API_URL } from "./settings";

import { Response, SadnessProvider, useRequest } from "../src";

const Button = ({ children, isActive, onClick }) => (
  <button onClick={onClick} type="button">
    {isActive ? <b>{children}</b> : children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const DataList = ({ data }) => (
  <ul>
    {data.map((item) => (
      <li key={item.slug}>{item.title}</li>
    ))}
  </ul>
);

DataList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ),
};

const Data = ({ uri }) => {
  const { response } = useRequest(uri);
  action("Data render")(uri, response.toJS());
  return (
    <Fragment>
      <h2>
        <code>{uri}</code>
      </h2>
      <Response
        data={response}
        render={({ content, stage }) => {
          action("API data render")(stage);
          return content;
        }}
      >
        {(data) => {
          action("API data ready")(uri, data);
          return <DataList data={data} />;
        }}
      </Response>
    </Fragment>
  );
};

Data.propTypes = {
  uri: PropTypes.string.isRequired,
};

const App = () => {
  const [uri, setUri] = useState("/projects");
  return (
    <Fragment>
      <Button
        isActive={uri === "/projects"}
        onClick={(evt) => {
          evt.preventDefault();
          setUri("/projects");
        }}
      >
        Projects
      </Button>
      <Button
        isActive={uri === "/talks"}
        onClick={(evt) => {
          evt.preventDefault();
          setUri("/talks");
        }}
      >
        Talks
      </Button>
      <Data uri={uri} />
    </Fragment>
  );
};

export const DepsProvider = () => (
  <SadnessProvider axios={axios.create({ baseURL: API_URL })}>
    <App />
  </SadnessProvider>
);

export default {
  title: "Deps",
};
