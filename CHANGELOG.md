# Changelog

## 1.0.0 (In Development)

## 1.0.0-rc.2 (2021-08-02)

Include lower bound supported versions of `axios` and `react` in peer dependencies.

### Fixes:

- Fix peer dependencies definition (#185)

One step closer to first final release. `1.0.0-rc.1` highlights moving `axios`, `react`, and `react-dom` to peer dependencies, as well as various dev improvements for the library infrastructure.

## 1.0.0-rc.1 (2021-08-02)

### Other:

- (**deps**) [security] bump websocket-extensions from 0.1.3 to 0.1.4 (#36)
- (**deps-dev**) bump @babel/core from 7.10.2 to 7.10.3 (#40)
- (**deps-dev**) bump @babel/cli from 7.10.1 to 7.10.3 (#41)
- (**deps-dev**) bump @babel/preset-env from 7.10.2 to 7.10.3 (#39)
- (**deps-dev**) bump @babel/preset-react from 7.10.1 to 7.10.4 (#42)
- (**deps-dev**) bump @babel/preset-env from 7.10.3 to 7.10.4 (#45)
- (**deps-dev**) bump @babel/core from 7.10.3 to 7.10.4 (#44)
- (**deps-dev**) bump @babel/cli from 7.10.3 to 7.10.4 (#43)
- Bump pre-commit hooks
- Bump github actions to use
- (**deps-dev**) bump @babel/core from 7.10.4 to 7.10.5 (#51)
- (**deps**) [security] bump lodash from 4.17.15 to 4.17.19 (#49)
- (**deps-dev**) bump @babel/cli from 7.10.4 to 7.10.5 (#50)
- (**deps**) [security] bump elliptic from 6.5.2 to 6.5.3 (#52)
- (**deps-dev**) bump @babel/preset-env from 7.10.4 to 7.11.0 (#54)
- (**deps-dev**) bump @babel/core from 7.10.5 to 7.11.0 (#53)
- (**deps-dev**) bump @babel/core from 7.11.0 to 7.11.1 (#55)
- Exclude .github directory from prettier check
- Create Dependabot config file (#56)
- Bump GitHub actions to use
- Bump pre-commit hooks
- Bump dependencies
- (**deps-dev**) bump @babel/preset-env from 7.11.0 to 7.11.5 (#78)
- (**deps-dev**) bump @storybook/react from 6.0.19 to 6.0.21 (#75)
- (**deps-dev**) bump @storybook/addon-links from 6.0.19 to 6.0.21 (#77)
- (**deps-dev**) bump @babel/cli from 7.10.5 to 7.11.5 (#76)
- (**deps-dev**) bump @storybook/addons from 6.0.19 to 6.0.21 (#74)
- (**deps-dev**) bump @storybook/addon-actions from 6.0.19 to 6.0.21 (#73)
- (**deps-dev**) bump @babel/core from 7.11.4 to 7.11.5 (#72)
- (**deps-dev**) bump @storybook/addon-storysource from 6.0.19 to 6.0.21 (#71)
- (**deps**) bump node-fetch from 2.6.0 to 2.6.1 (#79)
- (**deps-dev**) bump @babel/cli from 7.11.5 to 7.11.6 (#83)
- (**deps-dev**) bump @storybook/addon-links from 6.0.21 to 6.0.22 (#86)
- (**deps-dev**) bump @storybook/addon-actions from 6.0.21 to 6.0.22 (#85)
- (**deps-dev**) bump @babel/core from 7.11.5 to 7.11.6 (#84)
- (**deps-dev**) bump @storybook/addon-storysource from 6.0.21 to 6.0.22 (#81)
- (**deps-dev**) bump @storybook/react from 6.0.21 to 6.0.22 (#82)
- (**deps-dev**) bump @storybook/addons from 6.0.21 to 6.0.22 (#80)
- (**deps**) bump react from 16.13.1 to 16.14.0 (#89)
- (**deps**) bump axios from 0.20.0 to 0.21.0 (#94)
- Monthly maintenance (Aug 2021) (#175)
- (**deps**) bump actions/cache from 2.1.0 to 2.1.6 (#179)
- (**deps**) bump actions/checkout from 2.3.2 to 2.3.4 (#178)
- (**deps**) bump actions/setup-node from 2.1.1 to 2.3.0 (#176)
- (**deps**) bump actions/setup-python from 2.1.1 to 2.2.2 (#177)
- (**deps**) bump pre-commit/action from 2.0.0 to 2.0.3 (#180)
- Update README (#181)
- [#37] Provide badabump config file (#182)
- [#37] Fix release PR workflow again (#183)

### 1.0.0-rc.0 (2020-06-02)

- Better dependency management for `useRequest` hook: load new API data on
  changing API URL (as well as on `deps` change)

### 1.0.0-beta.2 (2020-05-05)

- Once again fix caching responses for prerendering

### 1.0.0-beta.1 (2020-05-05)

- Ensure that initial response from prerendered data loaded well

### 1.0.0-beta.0 (2020-04-13)

- Fix unconditional rerender `SadnessReady` component
- Ensure ready event triggered only once
- Fix caching responses

### 1.0.0-alpha.4 (2020-03-25)

- Provide `onSuccessResponse` & `onErrorResponse` request callbacks
- Allow to pass `deps` dependencies to inner `useEffect` call

### 1.0.0-alpha.3 (2020-03-24)

- Provide [storybook](https://react-sadness.now.sh) to show how to use
  `react-sadness` library
- Fix `onReload` & `onUpdate` response callbacks

### 1.0.0-alpha.2 (2020-03-23)

- Provide ability to override `SadnessProvider` default context values with
  `SadnessConfig` component

### 1.0.0-alpha.1 (2020-03-23)

- Use `package.json#source` field for pointing on source data, not
  `package.json#module`

### 1.0.0-alpha.0 (2020-03-23)

- Initial release
