# react-sadness

[![CI Workflow](https://github.com/playpauseandstop/react-sadness/workflows/ci/badge.svg)](https://github.com/playpauseandstop/react-sadness/actions?query=workflow%3A%22ci%22)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm version](https://img.shields.io/npm/v/react-sadness)](https://www.npmjs.com/package/react-sadness)
[![npm license](https://img.shields.io/npm/l/react-sadness)](https://www.npmjs.com/package/react-sadness)

`useRequest` hook & set of components for requesting API data within React applications.

- Built on top of [axios](https://github.com/axios/axios)
- Supports prerendering
- Provides common components for API needs

## Requirements

- [axios](https://github.com/axios/axios) 0.21 or later
- [React](https://reactjs.org) 16.13 or later

## Installation

```bash
npm install axios react react-dom react-sadness
```

**IMPORTANT:** You need to install `axios`, `react` & `react-dom` in your project additionally, as they listed as **peer** dependencies to `react-sadness`. Installing just `react-sadness` will not be enough.

## Quickstart

First, you need to wrap your app container into the `SadnessProvider` & `mount` it into the DOM element (instead of `render` or `hydrate`),

```jsx
import React from "react";
import { mount, SadnessProvider } from "react-sadness";
import { BrowserRouter } from "react-router";

mount(
  <SadnessProvider>
    <AppContainer />
  </SadnessProvider>,
  document.getElementById("ui")
);
```

Next, to request data from the API anywhere inside of `AppContainer`,

```jsx
import I from "immutable";
import React from "react";
import { Response, useRequest } from "react-sadness";

import { toUser } from "../records/User";

const toList = (data) => new I.List(data.map(toUser));

const Users = () => {
  const { state } = useRequest("/users", { responseDataConverter: toList });
  return (
    <Response state={state}>
      {(users) => (
        <ul>
          {users.map((item) => (
            <li key={item.id}>{item.username}</li>
          ))}
        </ul>
      )}
    </Response>
  );
};
```

### Prerendering

**IMPORTANT:** Example below illustrates prerendering data with [parcel-plugin-prerender](https://www.npmjs.com/package/parcel-plugin-prerender) plugin.

`react-sadness` supports prerendering by triggering `readyEvent` via `SadnessReady` HoC.

```jsx
import { SadnessReady } from "react-sadness";

const App = () => (
  {/* Ready event will trigger after both child requests will done */}
  <SadnessReady>
    {/* Request projects from API */}
    <Projects />
    {/* Request talks from API */}
    <Talks />
  </SadnessReady>
)
```

Afterwards, you need to setup `parcel-plugin-prerender` to wait before `readyEvent`, such as,

```json
  "prerender": {
    "rendererConfig": {
      "renderAfterDocumentEvent": "react-sadness-ready"
    }
  }
```

In case if children nodes does not contain any planned API requests, pass `force` prop to `SadnessReady` component to force triggering ready event,

```jsx
const About = () => (
  <SadnessReady force>
    <AboutContent />
  </SadnessReady>
);
```

## Examples

Visit [react-sadness.vercel.app](https://react-sadness.vercel.app) to browse through `react-sadness` Storybook.

Or run,

```bash
make run
```

to start Storybook server at `http://localhost:6006`.
