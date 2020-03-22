import I from "immutable";

export const ClassNames = new I.Record(
  {
    error: "text-danger",
    errorDetail: "my-3",
    emptyData: "text-info",
    loading: "text-muted"
  },
  "ReactSadnessClassNames"
);

export const Messages = new I.Record(
  {
    error: "Error",
    emptyData: "API request respond with empty data.",
    loading: "Loading…",
    networkError:
      "Unable to connect to API. Please ensure that API is up and is ready to receive requests from UI (CORS Headers is set)."
  },
  "ReactSadnessMessages"
);

export const Context = new I.Record(
  {
    axios: null,
    cachedResponsesContainerId: "react-sadness-cache",
    classNames: new ClassNames(),
    isCacheResponses: true,
    isTriggerPrerenderEvent: true,
    messages: new Messages(),
    onErrorRequest: () => {},
    onStartRequest: () => {},
    onSuccessRequest: () => {},
    prerenderEvent: "react-sadness-ready"
  },
  "ReactSadnessContext"
);

const filterDefined = data => {
  const onlyDefined = {};
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value !== undefined) {
      onlyDefined[key] = value;
    }
  });
  return onlyDefined;
};

export const toClassNames = data => new ClassNames(filterDefined(data));

export const toMessages = data => new Messages(filterDefined(data));

export const toContext = data =>
  new Context({
    ...filterDefined(data),
    classNames: toClassNames(data ? data.classNames || {} : {}),
    messages: toMessages(data ? data.messages || {} : {})
  });
