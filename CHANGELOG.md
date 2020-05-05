# Changelog

## 1.0.0 (In Development)

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
