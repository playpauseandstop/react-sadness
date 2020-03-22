import I from "immutable";
import PropTypes from "prop-types";
import React from "react";

import EmptyData from "./EmptyData";
import ErrorData from "./ErrorData";
import Loading from "./Loading";

import { APIRequestState, hasError, isLoading } from "../records";

const APIResponse = ({
  children,
  emptyData,
  isEmptyDataFunc,
  render,
  renderData,
  renderEmptyData,
  renderErrorData,
  renderLoading,
  state
}) => {
  if (isLoading(state)) {
    return render({ content: renderLoading(), stage: "renderLoading" });
  }

  if (hasError(state)) {
    return render({
      content: renderErrorData(state.errorData),
      stage: "renderErrorData"
    });
  }

  const { data } = state;
  if (isEmptyDataFunc(data)) {
    return render({
      content: renderEmptyData(emptyData),
      stage: "renderEmptyData"
    });
  }

  return render({
    content: renderData({ children, data }),
    stage: "renderData"
  });
};

APIResponse.defaultProps = {
  isEmptyDataFunc: function isEmptyData(data) {
    if (I.isImmutable(data) && typeof data.isEmpty === "function") {
      return data.isEmpty();
    }
    return !data;
  },
  render: function render({ content, stage }) {
    return content;
  },
  renderData: function render({ children, data }) {
    return children(data);
  },
  renderEmptyData: function renderEmptyData(emptyData) {
    return <EmptyData>{emptyData}</EmptyData>;
  },
  renderErrorData: function renderErrorData(errorData) {
    return <ErrorData data={errorData} />;
  },
  renderLoading: function renderLoading() {
    return <Loading />;
  }
};

APIResponse.propTypes = {
  children: PropTypes.func.isRequired,
  emptyData: PropTypes.node,
  isEmptyDataFunc: PropTypes.func,
  render: PropTypes.func,
  renderData: PropTypes.func,
  renderEmptyData: PropTypes.func,
  renderErrorData: PropTypes.func,
  renderLoading: PropTypes.func,
  state: PropTypes.instanceOf(APIRequestState).isRequired
};

export default APIResponse;
