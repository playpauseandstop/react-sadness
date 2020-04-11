import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import useSadnessContext from "../hooks/useSadnessContext";
import { triggerReadyEvent } from "../utils";

const SadnessReady = ({ children, force }) => {
  const context = useSadnessContext();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isEventFired, setIsEventFired] = useState(false);

  useEffect(() => {
    if (force || (!isFirstRender && context.requestsCounter === 0)) {
      if (!isEventFired) {
        triggerReadyEvent(context);
        setIsEventFired(true);
      }
    }
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [context, force, isEventFired, isFirstRender]);

  return children || null;
};

SadnessReady.defaultProps = {
  force: false,
};

SadnessReady.propTypes = {
  children: PropTypes.node,
  force: PropTypes.bool,
};

export default SadnessReady;
