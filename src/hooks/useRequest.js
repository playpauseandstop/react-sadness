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
  const request = toRequestRecord({ ...config, params, url });
  const emptyResponse = EMPTY_RESPONSE.set("request", request);
  const extra = { isCacheResponses: isCacheResponse };

  const context = useSadnessContext();
  const [response, setResponse] = useState(emptyResponse);

  const handleAxiosRequest = ({
    isCheckCache = false,
    isSetEmptyResponseOnStart = false
  } = {}) => {
    const { axios, onErrorRequest, onStartRequest, onSuccessRequest } = context;
    onStartRequest();

    if (isSetEmptyResponseOnStart) {
      setResponse(emptyResponse);
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
    handleAxiosRequest({ isCheckCache: true });
  }, []);

  return new ResponseContext({
    onReload: (isFullReload = false) => {
      handleAxiosRequest({
        isCheckCache: false,
        isSetEmptyResponseOnStart: isFullReload
      });
    },
    onUpdate: (nextResponse = null) => {
      if (!nextResponse) {
        setResponse(emptyResponse);
      } else if (nextResponse.status >= 400) {
        setResponse(toErrorResponseRecord(request, { response: nextResponse }));
      } else {
        setResponse(
          toSuccessResponseRecord(request, nextResponse, responseDataConverter)
        );
      }
    },
    response
  });
};

export default useRequest;
