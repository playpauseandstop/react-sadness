import { useEffect, useState } from "react";

import useSadnessContext from "./useSadnessContext";

import {
  buildFullUrl,
  ResponseContext,
  ResponseRecord,
  toErrorResponseRecord,
  toRequestRecord,
  toSuccessResponseRecord
} from "../records/Request";
import { loadCachedResponseData } from "../utils";

const EMPTY_RESPONSE = new ResponseRecord();

const useRequest = (
  url,
  { isCacheResponse, params, responseDataConverter, ...config } = {}
) => {
  const context = useSadnessContext();
  const [response, setResponse] = useState(EMPTY_RESPONSE);

  const extra = { isCacheResponses: isCacheResponse };
  const request = toRequestRecord({ ...config, params, url });

  const handleAPIRequest = (
    isCheckCache = false,
    isSetEmptyResponseOnStart = false
  ) => {
    const { axios, onErrorRequest, onStartRequest, onSuccessRequest } = context;
    onStartRequest();

    if (isSetEmptyResponseOnStart) {
      setResponse(EMPTY_RESPONSE);
    }

    if (isCheckCache) {
      const cachedData = loadCachedResponseData(request, context);
      if (cachedData) {
        onSuccessRequest(request, true, extra);
        setResponse(
          toSuccessResponseRecord(
            request,
            { data: cachedData },
            responseDataConverter
          )
        );
      }
    }

    axios
      .request({ ...config, url: buildFullUrl(request) })
      .then(response => {
        onSuccessRequest(request, response, extra);
        setResponse(
          toSuccessResponseRecord(request, response, responseDataConverter)
        );
      })
      .catch(err => {
        onErrorRequest();
        setResponse(toErrorResponseRecord(request, err));
      });
  };

  useEffect(() => {
    handleAPIRequest(true);
  }, []);

  return new ResponseContext({
    onReload: (isFullReload = false) => {
      handleAPIRequest({
        isCheckCache: false,
        isSetEmptyResponseOnStart: isFullReload
      });
    },
    onUpdate: nextState => {
      setResponse(nextState);
    },
    response
  });
};

export default useRequest;
