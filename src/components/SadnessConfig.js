import React from "react";

import { SadnessContext } from "../contexts";
import useSadnessContext from "../hooks/useSadnessContext";
import { SadnessContextPropTypes } from "../propTypes";
import { prepareContextData, toContextRecord } from "../records/Context";

const SadnessConfig = ({ children, ...contextProps }) => {
  const defaultContext = useSadnessContext();

  const context = defaultContext
    ? defaultContext.mergeDeep(prepareContextData(contextProps))
    : toContextRecord(contextProps);

  return (
    <SadnessContext.Provider value={context}>
      {children}
    </SadnessContext.Provider>
  );
};

SadnessConfig.propTypes = SadnessContextPropTypes;

export default SadnessConfig;
