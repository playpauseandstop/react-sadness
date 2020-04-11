import { action } from "@storybook/addon-actions";
import axios from "axios";
import I from "immutable";
import React, { Fragment, useEffect, useState } from "react";

import ProjectsList from "./components/ProjectsList";
import { API_URL } from "./settings";
import {
  RequestRecord,
  Response,
  SadnessProvider,
  SadnessReady,
  useRequest,
} from "../src";
import { loadCachedResponseData } from "../src/utils";

const PrerenderState = new I.Record({
  isReady: false,
  content: null,
  currentContent: null,
});

const loadCacheContent = () =>
  loadCachedResponseData(
    new RequestRecord({
      method: "get",
      url: "/projects",
    }),
    { cachedResponsesContainerId: "react-sadness-cache" },
    { removeCache: false }
  );

const Projects = () => {
  const { response } = useRequest("/projects");
  return (
    <Response data={response}>
      {(projects) => <ProjectsList data={projects} />}
    </Response>
  );
};

export const Prerender = () => {
  const [state, setState] = useState(new PrerenderState());

  const readyEventHandler = () => {
    action("react-sadness-ready fired")();
    setState(
      new PrerenderState({
        isReady: true,
        content: loadCacheContent(),
      })
    );
  };

  useEffect(() => {
    document.addEventListener("react-sadness-ready", readyEventHandler);
    return () => {
      document.removeEventListener("react-sadness-ready", readyEventHandler);
    };
  });

  return (
    <Fragment>
      <h1>Prerender Demo</h1>

      <h2>Projects</h2>
      <SadnessProvider
        axios={axios.create({ baseURL: API_URL })}
        cachedResponsesContainerId="react-sadness-cache"
        readyEvent="react-sadness-ready"
      >
        <SadnessReady>
          <Projects />
        </SadnessReady>
      </SadnessProvider>

      <h2>Details</h2>
      <dl>
        <dt>
          <b>Is ready event triggered?</b>
        </dt>
        <dd>
          <code>{JSON.stringify(state.isReady)}</code>
        </dd>

        <dt>
          <b>Cache content:</b>
        </dt>
        <dd>
          <pre style={{ whiteSpace: "pre-line" }}>
            <code>{JSON.stringify(state.content)}</code>
          </pre>
        </dd>

        <dt>
          <b>Current cache content:</b>
        </dt>
        <dd>
          <button
            onClick={(evt) => {
              evt.preventDefault();

              action("Loading current cache content")();
              setState((currentState) =>
                currentState.set("currentContent", loadCacheContent())
              );
            }}
            type="button"
          >
            Retrieve
          </button>
          <pre style={{ whiteSpace: "pre-line" }}>
            <code>{JSON.stringify(state.currentContent)}</code>
          </pre>
        </dd>
      </dl>

      <div id="react-sadness-cache" />
    </Fragment>
  );
};

export default {
  title: "Prerendering",
};
