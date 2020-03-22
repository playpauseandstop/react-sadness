# react-sadness

Set of components and utilities for requesting API data within React
applications.

- Built on top of [axios](https://github.com/axios/axios)
- Supports prerendering
- Provides common components for API needs

## Requirements

- [React](https://reactjs.org) 16.13 or later

## Quickstart

First, you need to wrap your app container into the `SadnessProvider` & `mount`
it into the DOM element (instead of `render` or `hydrate`),

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
import React, { useContext } from "react";
import { APIResponse, useAPIRequest } from "react-sadness";

import { toUser } from "../records/User";

const toList = data => new I.List(data.map(toUser));

const Users = () => {
  const { state } = useAPIRequest("/users", { responseDataConverter: toList });
  return (
    <APIResponse state={state}>
      {users => (
        <ul>
          {users.map(item => (
            <li key={item.id}>{item.username}</li>
          ))}
        </ul>
      )}
    </APIResponse>
  );
};
```
