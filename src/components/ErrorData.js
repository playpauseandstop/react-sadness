import PropTypes from "prop-types";
import React, { Fragment } from "react";

import useSadnessContext from "../hooks/useSadnessContext";
import { ErrorDataRecord } from "../records/Request";
import { isProduction } from "../utils";

const ErrorData = ({
  children,
  className,
  data: { detail },
  detailClassName,
}) => {
  const { classNames, messages } = useSadnessContext();

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

ErrorData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  data: PropTypes.instanceOf(ErrorDataRecord).isRequired,
  detailClassName: PropTypes.string,
};

export default ErrorData;
