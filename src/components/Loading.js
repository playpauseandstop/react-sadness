import PropTypes from "prop-types";
import React from "react";

import useSadnessContext from "../hooks/useSadnessContext";

const Loading = ({ children, className }) => {
  const { classNames, messages } = useSadnessContext();
  return (
    <div className={className || classNames.loading}>
      {children || messages.loading}
    </div>
  );
};

Loading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Loading;
