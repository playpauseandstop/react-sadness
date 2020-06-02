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

const CACHE_CONTENT = (
  <data
    value='{"method":"get","params":{},"url":"/projects"}'
    data-response-data='[{"slug":"react-sadness","title":"react-sadness","description":"`useRequest` hook &amp; set of components for requesting API data within\n[React](https://reactjs.org) applications.\n\n- Built on top of [axios](https://github.com/axios/axios)\n- Supports prerendering\n- Provides common components for API needs\n","code":"`index.js`\n\n```javascript\nimport React from \"react\";\nimport { mount, SadnessProvider } from \"react-sadness\";\n\nimport App from \"./App\";\n\nmount(\n  <SadnessProvider>\n    <App />\n  </SadnessProvider>,\n  document.getElementById(\"ui\")\n);\n```\n\n----\n\n`App.js`\n\n```javascript\nimport React from \"react\";\nimport { Response, useRequest } from \"react-sadness\";\n\nconst App = () => {\n  const { response } = useRequest(\"/api/projects\");\n  return (\n    <Response data={response}>\n      {projects => <Projects data={projects} />}\n    </Response>\n  );\n};\n\nexport default App;\n```\n","github":"playpauseandstop/react-sadness","npm":"react-sadness","demo":"https://react-sadness.now.sh"}]'
  ></data>
);

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
  const [counter, setCounter] = useState(0);
  const { response } = useRequest("/projects", { deps: [counter] });
  return (
    <Fragment>
      <Response data={response}>
        {(projects) => <ProjectsList data={projects} />}
      </Response>
      <button
        onClick={(evt) => {
          evt.preventDefault();
          setCounter((current) => current + 1);
        }}
        type="button"
      >
        Increase Counter ({counter})
      </button>
    </Fragment>
  );
};

const PrerenderContainer = () => {
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
  }, []);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export const Prerender = () => (
  <Fragment>
    <h1>Prerender Demo</h1>
    <p>
      After content will be loaded from <code>/projects</code> endpoint it will
      be stored into <code>react-sadness-cache</code> element. Also{" "}
      <code>react-sadness-ready</code> event triggered after request is
      finished.
    </p>
    <PrerenderContainer />
    <div id="react-sadness-cache" />
  </Fragment>
);

export const CachedContent = () => {
  const [isCacheReady, setIsCacheReady] = useState(false);
  useEffect(() => {
    if (!isCacheReady) {
      setIsCacheReady(true);
    }
  }, [isCacheReady]);
  return (
    <Fragment>
      <h1>Cached Content Demo</h1>
      <p>
        Instead of making actual request to <code>/projects</code> endpoint,
        content will be rendered from <code>react-sadness-cache</code> element.{" "}
        <code>react-sadness-ready</code> event still triggered after content
        will be loaded from cache and will be ready to render.
      </p>
      <p>
        After cached content will be used, it will be removed from the tree, so
        next request to <code>/projects</code> endpoint will run actual request.
      </p>
      {isCacheReady ? <PrerenderContainer /> : null}
      <div id="react-sadness-cache">{CACHE_CONTENT}</div>
    </Fragment>
  );
};

export default {
  title: "Prerendering",
};
