import I from "immutable";
import PropTypes from "prop-types";
import React from "react";

import EmptyResponseData from "./EmptyResponseData";
import ErrorData from "./ErrorData";
import Loading from "./Loading";

import { hasError, isLoading, ResponseRecord } from "../records";

const Response = ({
  children,
  data,
  emptyDataMessage,
  isEmptyResponseDataFunc,
  render,
  renderEmptyResponseData,
  renderErrorData,
  renderLoading,
  renderResponseData,
}) => {
  if (isLoading(data)) {
    return render({ content: renderLoading(), stage: "renderLoading" });
  }

  if (hasError(data)) {
    return render({
      content: renderErrorData(data.errorData),
      stage: "renderErrorData",
    });
  }

  const { data: responseData } = data;
  if (isEmptyResponseDataFunc(responseData)) {
    return render({
      content: renderEmptyResponseData(emptyDataMessage),
      stage: "renderEmptyResponseData",
    });
  }

  return render({
    content: renderResponseData({ children, responseData }),
    stage: "renderResponseData",
  });
};

Response.defaultProps = {
  isEmptyResponseDataFunc: function isEmptyResponseData(responseData) {
    if (
      I.isImmutable(responseData) &&
      typeof responseData.isEmpty === "function"
    ) {
      return responseData.isEmpty();
    }
    return !responseData;
  },
  render: function render({ content, stage }) {
    return content;
  },
  renderEmptyResponseData: function renderEmptyResponseData(children) {
    return <EmptyResponseData>{children}</EmptyResponseData>;
  },
  renderErrorData: function renderErrorData(errorData) {
    return <ErrorData data={errorData} />;
  },
  renderLoading: function renderLoading() {
    return <Loading />;
  },
  renderResponseData: function render({ children, responseData }) {
    return children(responseData);
  },
};

Response.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(ResponseRecord).isRequired,
  emptyDataMessage: PropTypes.node,
  isEmptyResponseDataFunc: PropTypes.func,
  render: PropTypes.func,
  renderEmptyResponseData: PropTypes.func,
  renderErrorData: PropTypes.func,
  renderLoading: PropTypes.func,
  renderResponseData: PropTypes.func,
};

export default Response;
