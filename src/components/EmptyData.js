import PropTypes from "prop-types";
import React, { useContext } from "react";

import { ReactSadnessContext } from "../contexts";

const EmptyData = ({ children, className }) => {
  const { classNames, messages } = useContext(ReactSadnessContext);
  return (
    <div className={className || classNames.emptyData}>
      {children || messages.emptyData}
    </div>
  );
};

EmptyData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default EmptyData;
