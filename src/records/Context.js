import I from "immutable";

import { DEFAULT_AXIOS } from "../constants";

export const ClassNamesRecord = new I.Record(
  {
    error: "text-danger",
    errorDetail: "my-3",
    emptyData: "text-info",
    loading: "text-muted",
  },
  "ReactSadnessClassNamesRecord"
);

export const MessagesRecord = new I.Record(
  {
    error: "Error",
    emptyData: "API request respond with empty data.",
    loading: "Loading…",
    networkError:
      "Unable to connect to API. Please ensure that API is up and is ready to receive requests from UI (CORS Headers is set).",
  },
  "ReactSadnessMessagesRecord"
);

export const ContextRecord = new I.Record(
  {
    axios: null,
    cachedResponsesContainerId: "react-sadness-cache",
    classNames: new ClassNamesRecord(),
    isCacheResponses: true,
    isTriggerReadyEvent: true,
    messages: new MessagesRecord(),
    onErrorRequest: () => {},
    onStartRequest: () => {},
    onSuccessRequest: () => {},
    readyEvent: "react-sadness-ready",
    requestsCounter: 0,
  },
  "ReactSadnessContext"
);

export const filterDefined = (data) => {
  const onlyDefined = {};
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== undefined) {
      onlyDefined[key] = value;
    }
  });
  return onlyDefined;
};

export const prepareContextData = ({
  axios,
  cachedResponsesContainerId,
  emptyDataClassName,
  emptyDataMessage,
  errorClassName,
  errorMessage,
  isCacheResponses,
  isTriggerReadyEvent,
  loadingClassName,
  loadingMessage,
  networkErrorMessage,
  readyEvent,
}) =>
  filterDefined({
    axios,
    cachedResponsesContainerId,
    classNames: filterDefined({
      emptyData: emptyDataClassName,
      error: errorClassName,
      loading: loadingClassName,
    }),
    isCacheResponses,
    isTriggerReadyEvent,
    messages: filterDefined({
      emptyData: emptyDataMessage,
      error: errorMessage,
      loading: loadingMessage,
      networkError: networkErrorMessage,
    }),
    readyEvent,
  });

export const toClassNamesRecord = (data) =>
  new ClassNamesRecord(filterDefined(data));

export const toMessagesRecord = (data) =>
  new MessagesRecord(filterDefined(data));

export const toContextRecord = (props) => {
  const data = prepareContextData(props);
  return new ContextRecord({
    ...data,
    axios: data.axios || DEFAULT_AXIOS,
    classNames: toClassNamesRecord(data.classNames),
    messages: toMessagesRecord(data.messages),
  });
};
