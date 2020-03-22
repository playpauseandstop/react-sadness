import I from "immutable";
import qs from "qs";

export const APIErrorData = new I.Record(
  {
    detail: null,
    status: null
  },
  "APIErrorData"
);

export const APIRequest = new I.Record(
  {
    headers: new I.OrderedMap(),
    params: new I.OrderedMap(),
    method: "get",
    url: null
  },
  "APIRequest"
);

export const APIRequestState = new I.Record(
  {
    data: null,
    errorData: null,
    request: null,
    status: null
  },
  "APIRequestState"
);

export const APIRequestStateContext = new I.Record(
  {
    onReload: () => {},
    onUpdate: () => {},
    state: new APIRequestState()
  },
  "APIRequestStateContext"
);

export const APIRequestResponseState = new I.Record(
  {
    request: null,
    response: null
  },
  "APIRequestResponseState"
);

export const buildFullUrl = ({ url, params }) => {
  const queryString = params.isEmpty() ? "" : `?${qs.stringify(params.toJS())}`;
  return `${url}${queryString}`;
};

export const hasData = state => (state ? state.data !== null : false);

export const hasError = state => (state ? state.errorData !== null : false);

export const isEqualRequests = (apiRequestResponseState, request) =>
  apiRequestResponseState.request &&
  apiRequestResponseState.request.equals(request);

export const isLoading = state => (state ? state.status === null : false);

export const toAPIErrorData = err => {
  let detail;
  let status;

  if (!err.response) {
    detail = err.message;
  } else {
    status = err.response.status;

    if (typeof err.response.data === "string") {
      try {
        const data = JSON.parse(err.response.data);
        detail = data.detail;
      } catch {}
    } else {
      detail = err.response.data.detail;
    }
  }

  return new APIErrorData({ detail, status });
};

export const toAPIError = (request, err) =>
  new APIRequestState({
    errorData: toAPIErrorData(err),
    request,
    status: false
  });

export const toAPIRequest = data =>
  new APIRequest({
    ...data,
    headers: new I.OrderedMap(data.headers || {}),
    params: new I.OrderedMap(data.params || {})
  });

export const toAPISuccess = (request, response, converter) =>
  new APIRequestState({
    data: converter ? converter(response.data) : response.data,
    request,
    status: true
  });
