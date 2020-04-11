import PropTypes from "prop-types";
import React from "react";

import useSadnessContext from "../hooks/useSadnessContext";

const EmptyResponseData = ({ children, className }) => {
  const { classNames, messages } = useSadnessContext();
  return (
    <div className={className || classNames.emptyData}>
      {children || messages.emptyData}
    </div>
  );
};

EmptyResponseData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default EmptyResponseData;
