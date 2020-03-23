import I from "immutable";

import { toRequestRecord } from "./records/Request";

const REQUEST_ATTR = "value";
const RESPONSE_DATA_KEY = "responseData";

export const cacheResponseData = (
  request,
  response,
  { cachedResponsesContainerId, isCacheResponses }
) => {
  if (!isCacheResponses) {
    return;
  }

  const el = document.getElementById(cachedResponsesContainerId);
  if (!el) {
    return;
  }

  const dataEl = document.createElement("data");
  dataEl.setAttribute(REQUEST_ATTR, JSON.stringify(request.toJS()));
  dataEl.dataset[RESPONSE_DATA_KEY] = JSON.stringify(response.data);

  el.appendChild(dataEl);
};

export const isProduction = () => process.env.NODE_ENV === "production";

export const loadJsonData = maybeData => {
  try {
    return JSON.parse(maybeData);
  } catch {
    return null;
  }
};

export const loadCachedResponseData = (
  request,
  { cachedResponsesContainerId }
) => {
  const dataElList = new I.List(
    Array.prototype.slice.call(
      document.querySelectorAll(`#${cachedResponsesContainerId} data`)
    )
  );
  if (dataElList.isEmpty()) {
    return null;
  }

  const dataEl = dataElList.find(item => {
    const maybeRequest = toRequestRecord(
      loadJsonData(item.getAttribute(REQUEST_ATTR))
    );
    return maybeRequest.equals(request);
  });

  if (!dataEl) {
    return null;
  }

  const maybeData = loadJsonData(dataEl.dataset[RESPONSE_DATA_KEY]);
  if (!maybeData) {
    return null;
  }

  dataEl.remove();
  return maybeData;
};

export const triggerReadyEvent = ({ isTriggerReadyEvent, readyEvent }) => {
  if (isTriggerReadyEvent) {
    document.dispatchEvent(new Event(readyEvent));
  }
};
