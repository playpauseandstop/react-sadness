import { useEffect, useState } from "react";

import useSadnessContext from "./useSadnessContext";

import {
  buildFullUrl,
  ResponseContext,
  ResponseRecord,
  toErrorResponseRecord,
  toRequestRecord,
  toSuccessResponseRecord,
} from "../records/Request";
import { loadCachedResponseData } from "../utils";

const EMPTY_RESPONSE = new ResponseRecord();

const handleAxiosRequestFactory = ({
  context,
  setResponse,
  emptyResponse,
  request,
  props,
}) => ({ isCheckCache = false, isSetEmptyResponseOnStart = false } = {}) => {
  const { axios, onErrorRequest, onStartRequest, onSuccessRequest } = context;
  const {
    isCacheResponse,
    onErrorResponse,
    onSuccessResponse,
    params,
    responseDataConverter,
    ...config
  } = props;

  const extraContext = { isCacheResponses: isCacheResponse };

  onStartRequest();

  if (isSetEmptyResponseOnStart) {
    setResponse(emptyResponse);
  }

  if (isCheckCache) {
    const cachedData = loadCachedResponseData(request, context);
    if (cachedData) {
      onSuccessRequest(request, null, extraContext);

      const nextResponse = toSuccessResponseRecord(
        request,
        { data: cachedData },
        responseDataConverter
      );
      setResponse(nextResponse);

      if (onSuccessResponse) {
        onSuccessResponse(request, nextResponse);
      }
    }
  }

  axios
    .request({ ...config, url: buildFullUrl(request) })
    .then((axiosResponse) => {
      onSuccessRequest(request, axiosResponse, extraContext);

      const nextResponse = toSuccessResponseRecord(
        request,
        axiosResponse,
        responseDataConverter
      );
      setResponse(nextResponse);

      if (onSuccessResponse) {
        onSuccessResponse(request, nextResponse);
      }
    })
    .catch((axiosErr) => {
      onErrorRequest();

      const nextResponse = toErrorResponseRecord(request, axiosErr);
      setResponse(nextResponse);

      if (onErrorResponse) {
        onErrorResponse(request, nextResponse);
      }
    });
};

const useRequest = (url, { deps, ...props } = {}) => {
  const request = toRequestRecord({ ...props, url });
  const emptyResponse = EMPTY_RESPONSE.set("request", request);

  const context = useSadnessContext();
  const [response, setResponse] = useState(emptyResponse);

  const handleAxiosRequest = handleAxiosRequestFactory({
    context,
    request,
    setResponse,
    emptyResponse,
    props,
  });

  useEffect(() => {
    handleAxiosRequest({ isCheckCache: true });
  }, deps || []); // eslint-disable-line react-hooks/exhaustive-deps

  return new ResponseContext({
    onReload: (isFullReload = false) => {
      handleAxiosRequest({
        isCheckCache: false,
        isSetEmptyResponseOnStart: isFullReload,
      });
    },
    onUpdate: (nextResponse = null) => {
      if (!nextResponse) {
        setResponse(emptyResponse);
      } else if (nextResponse.status >= 400) {
        setResponse(toErrorResponseRecord(request, { response: nextResponse }));
      } else {
        setResponse(
          toSuccessResponseRecord(
            request,
            nextResponse,
            props.responseDataConverter
          )
        );
      }
    },
    response,
  });
};

export default useRequest;
