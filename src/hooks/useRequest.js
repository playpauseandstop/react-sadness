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

const getInitialResponse = ({ isInitialRender, ...bag }) => {
  const { context, emptyResponse, props, request } = bag;
  const { responseDataConverter } = props;

  if (!isInitialRender) {
    return emptyResponse;
  }

  const cachedData = loadCachedResponseData(request, context);
  if (cachedData) {
    return toSuccessResponseRecord(
      request,
      { data: cachedData },
      responseDataConverter
    );
  }

  return emptyResponse;
};

const handleAxiosRequestFactory = ({ setResponse, ...bag }) => ({
  isSetEmptyResponseOnStart = false,
} = {}) => {
  const { context, emptyResponse, props, request } = bag;
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
  const [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    }
  }, [isInitialRender]);

  const bag = { context, emptyResponse, props, request };
  const initialResponse = getInitialResponse({ ...bag, isInitialRender });
  const isFromCache = !initialResponse.equals(emptyResponse);
  const [response, setResponse] = useState(initialResponse);

  const handleAxiosRequest = handleAxiosRequestFactory({ ...bag, setResponse });
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isFromCache) {
      const { onStartRequest, onSuccessRequest } = context;
      const { onSuccessResponse } = props;

      onStartRequest(request);
      onSuccessRequest(request, null, {});

      if (onSuccessResponse) {
        onSuccessResponse(request, response);
      }
    }
  }, []);

  useEffect(() => {
    if (!isFromCache) {
      handleAxiosRequest({ isSetEmptyResponseOnStart: !isInitialRender });
    }
  }, [url, ...(deps || [])]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return new ResponseContext({
    onReload: (isFullReload = false) => {
      handleAxiosRequest({ isSetEmptyResponseOnStart: isFullReload });
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
