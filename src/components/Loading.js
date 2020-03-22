import PropTypes from "prop-types";
import React, { useContext } from "react";

import { ReactSadnessContext } from "../contexts";

const Loading = ({ children, className }) => {
  const { classNames, messages } = useContext(ReactSadnessContext);
  return (
    <div className={className || classNames.loading}>
      {children || messages.loading}
    </div>
  );
};

Loading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Loading;
