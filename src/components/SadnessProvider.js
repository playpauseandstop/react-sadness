import React, { useState } from "react";

import { SadnessContext } from "../contexts";
import { SadnessContextPropTypes } from "../propTypes";
import { filterDefined, toContextRecord } from "../records/Context";
import { cacheResponseData } from "../utils";

const SadnessProvider = ({ children, ...contextProps }) => {
  const [requestsCounter, setRequestsCounter] = useState(0);

  const context = toContextRecord({
    ...contextProps,
    onErrorRequest: () => {
      setRequestsCounter(current => current - 1);
    },
    onStartRequest: () => {
      setRequestsCounter(current => current + 1);
    },
    onSuccessRequest: (request, axiosResponse, extra) => {
      if (axiosResponse !== null) {
        cacheResponseData(
          request,
          axiosResponse,
          context.merge(filterDefined(extra))
        );
      }
      setRequestsCounter(current => current - 1);
    },
    requestsCounter
  });

  return (
    <SadnessContext.Provider value={context}>
      {children}
    </SadnessContext.Provider>
  );
};

SadnessProvider.propTypes = SadnessContextPropTypes;

export default SadnessProvider;
