import I from "immutable";
import qs from "qs";

export const ErrorDataRecord = new I.Record(
  {
    detail: null,
    status: null,
    title: null
  },
  "ReactSadnessErrorDataRecord"
);

export const RequestRecord = new I.Record(
  {
    method: "get",
    params: new I.OrderedMap(),
    url: null
  },
  "ReactSadnessRequestRecord"
);

export const ResponseRecord = new I.Record(
  {
    data: null,
    errorData: null,
    request: null,
    status: null
  },
  "ReactSadnessResponseRecord"
);

export const ResponseContext = new I.Record(
  {
    onReload: () => {},
    onUpdate: () => {},
    response: new ResponseRecord()
  },
  "ReactSadnessResponseContext"
);

export const buildFullUrl = ({ url, params }) => {
  const queryString = params.isEmpty() ? "" : `?${qs.stringify(params.toJS())}`;
  return `${url}${queryString}`;
};

export const hasData = response => (response ? response.data !== null : false);

export const hasError = response =>
  response ? response.errorData !== null : false;

export const isEqualRequests = (first, second) =>
  first.request && first.request.equals(second.request);

export const isLoading = response =>
  response ? response.status === null : false;

export const toErrorDataRecord = (err, extra = {}) => {
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

  return new ErrorDataRecord({ ...extra, detail, status });
};

export const toErrorResponseRecord = (request, err) =>
  new ResponseRecord({
    errorData: toErrorDataRecord(err),
    request,
    status: false
  });

export const toRequestRecord = data =>
  new RequestRecord({
    ...data,
    params: new I.OrderedMap(data.params || {})
  });

export const toSuccessResponseRecord = (request, response, converter) =>
  new ResponseRecord({
    data: converter ? converter(response.data) : response.data,
    request,
    status: true
  });
