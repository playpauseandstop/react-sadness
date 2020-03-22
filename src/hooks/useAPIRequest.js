import { useEffect, useState } from "react";

import useSadnessContext from "./useSadnessContext";

import {
  APIRequestState,
  APIRequestStateContext,
  buildFullUrl,
  toAPIError,
  toAPIRequest,
  toAPISuccess
} from "../records/API";
import { loadCachedResponseData } from "../utils";

const EMPTY_STATE = new APIRequestState();

const useAPIRequest = (
  url,
  { params, responseDataConverter, ...config } = {}
) => {
  const context = useSadnessContext();
  const [state, setState] = useState(EMPTY_STATE);

  const request = toAPIRequest({ ...config, params, url });

  const handleAPIRequest = (
    isCheckCache = false,
    isSetEmptyStateOnStart = false
  ) => {
    const { axios, onErrorRequest, onStartRequest, onSuccessRequest } = context;
    onStartRequest();

    if (isSetEmptyStateOnStart) {
      setState(EMPTY_STATE);
    }

    if (isCheckCache) {
      const cachedData = loadCachedResponseData(request, context);
      if (cachedData) {
        onSuccessRequest(request, true);
        setState(
          toAPISuccess(request, { data: cachedData }, responseDataConverter)
        );
      }
    }

    axios
      .request({ ...config, url: buildFullUrl(request) })
      .then(response => {
        onSuccessRequest(request, response);
        setState(toAPISuccess(request, response, responseDataConverter));
      })
      .catch(err => {
        onErrorRequest();
        setState(toAPIError(request, err));
      });
  };

  useEffect(() => {
    handleAPIRequest(true);
  }, []);

  return new APIRequestStateContext({
    onReload: (isFullReload = false) => {
      handleAPIRequest({
        isCheckCache: false,
        isSetEmptyStateOnStart: isFullReload
      });
    },
    onUpdate: nextState => {
      setState(nextState);
    },
    state
  });
};

export default useAPIRequest;
