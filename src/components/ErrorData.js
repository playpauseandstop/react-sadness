import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";

import { ReactSadnessContext } from "../contexts";
import { APIErrorData } from "../records";
import { isProduction } from "../utils";

const ErrorDetails = ({
  children,
  className,
  data: { detail },
  detailClassName
}) => {
  const { classNames, messages } = useContext(ReactSadnessContext);

  const isNetworkError = detail === "Network Error";
  let errorDetail = detail;
  if (!isProduction() && isNetworkError) {
    errorDetail = messages.networkError;
  }

  return (
    <Fragment>
      <h2 className={className || classNames.error}>
        {children || messages.error}
      </h2>
      <div className={detailClassName || classNames.errorDetail}>
        {Array.isArray(errorDetail) ? JSON.stringify(errorDetail) : errorDetail}
      </div>
    </Fragment>
  );
};

ErrorDetails.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  data: PropTypes.instanceOf(APIErrorData).isRequired,
  detailClassName: PropTypes.string
};

export default ErrorDetails;
