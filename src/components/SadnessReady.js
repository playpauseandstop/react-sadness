import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import useSadnessContext from "../hooks/useSadnessContext";
import { triggerReadyEvent } from "../utils";

const SadnessReady = ({ children, force }) => {
  const context = useSadnessContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (force || (!isFirstRender && context.requestsCounter === 0)) {
      triggerReadyEvent(context);
    }
    setIsFirstRender(false);
  }, [context, force, isFirstRender]);

  return children || null;
};

SadnessReady.defaultProps = {
  force: false
};

SadnessReady.propTypes = {
  children: PropTypes.node,
  force: PropTypes.bool
};

export default SadnessReady;
