import React, { useState } from "react";

import { SadnessContext } from "../contexts";
import { SadnessContextPropTypes } from "../propTypes";
import {
  filterDefined,
  prepareContextData,
  toContextRecord
} from "../records/Context";
import { cacheResponseData } from "../utils";

const SadnessProvider = ({ children, ...contextProps }) => {
  const [requestsCounter, setRequestsCounter] = useState(0);

  const context = toContextRecord({
    ...prepareContextData(contextProps),
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
