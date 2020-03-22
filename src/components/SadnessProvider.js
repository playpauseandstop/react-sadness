import axiosLibrary from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { ReactSadnessContext } from "../contexts";
import { toContext } from "../records/Context";
import { cacheResponseData, triggerPrerenderEvent } from "../utils";

const SadnessProvider = ({
  axios,
  cachedResponsesContainerId,
  children,
  emptyDataClassName,
  emptyDataMessage,
  errorClassName,
  errorMessage,
  isCacheResponses,
  isTriggerPrerenderEvent,
  loadingClassName,
  loadingMessage,
  networkErrorMessage,
  prerenderEvent
}) => {
  const setRequestsCounter = useState(0)[1];

  const context = toContext({
    axios: axios || axiosLibrary.create(),
    cachedResponsesContainerId,
    classNames: {
      emptyData: emptyDataClassName,
      error: errorClassName,
      loading: loadingClassName
    },
    isCacheResponses,
    isTriggerPrerenderEvent,
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
    onSuccessRequest: (request, response) => {
      if (response !== true) {
        cacheResponseData(request, response, context);
      }

      setRequestsCounter(current => {
        const nextCounter = current - 1;

        const maybeZero = nextCounter === 0;
        if (maybeZero) {
          triggerPrerenderEvent(context);
        }

        return nextCounter;
      });
    },
    prerenderEvent
  });

  return (
    <ReactSadnessContext.Provider value={context}>
      {children}
    </ReactSadnessContext.Provider>
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
  isTriggerPrerenderEvent: PropTypes.bool,
  loadingClassName: PropTypes.string,
  loadingMessage: PropTypes.string,
  networkErrorMessage: PropTypes.string,
  prerenderEvent: PropTypes.string
};

export default SadnessProvider;
