import axiosLibrary from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { SadnessContext } from "../contexts";
import { filterDefined, toContext } from "../records/Context";
import { cacheResponseData } from "../utils";

const SadnessProvider = ({
  axios,
  cachedResponsesContainerId,
  children,
  emptyDataClassName,
  emptyDataMessage,
  errorClassName,
  errorMessage,
  isCacheResponses,
  isTriggerReadyEvent,
  loadingClassName,
  loadingMessage,
  networkErrorMessage,
  readyEvent
}) => {
  const [requestsCounter, setRequestsCounter] = useState(0);

  const context = toContext({
    axios: axios || axiosLibrary.create(),
    cachedResponsesContainerId,
    classNames: {
      emptyData: emptyDataClassName,
      error: errorClassName,
      loading: loadingClassName
    },
    isCacheResponses,
    isTriggerReadyEvent,
    messages: {
      emptyData: emptyDataMessage,
      error: errorMessage,
      loading: loadingMessage,
      networkError: networkErrorMessage
    },
    onErrorRequest: () => {
      setRequestsCounter(current => current - 1);
    },
    onStartRequest: () => {
      setRequestsCounter(current => current + 1);
    },
    onSuccessRequest: (request, response, extra) => {
      if (response !== true) {
        cacheResponseData(
          request,
          response,
          context.merge(filterDefined(extra))
        );
      }
      setRequestsCounter(current => current - 1);
    },
    readyEvent,
    requestsCounter
  });

  return (
    <SadnessContext.Provider value={context}>
      {children}
    </SadnessContext.Provider>
  );
};

SadnessProvider.propTypes = {
  axios: PropTypes.func,
  cachedResponsesContainerId: PropTypes.string,
  children: PropTypes.node.isRequired,
  emptyDataClassName: PropTypes.string,
  emptyDataMessage: PropTypes.string,
  errorClassName: PropTypes.string,
  errorMessage: PropTypes.string,
  isCacheResponses: PropTypes.bool,
  isTriggerReadyEvent: PropTypes.bool,
  loadingClassName: PropTypes.string,
  loadingMessage: PropTypes.string,
  networkErrorMessage: PropTypes.string,
  readyEvent: PropTypes.string
};

export default SadnessProvider;
