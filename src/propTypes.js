import PropTypes from "prop-types";

export const SadnessContextPropTypes = {
  axios: PropTypes.func,
  cachedResponsesContainerId: PropTypes.string,
  children: PropTypes.node.isRequired,
  emptyDataClassName: PropTypes.string,
  emptyDataMessage: PropTypes.string,
  errorClassName: PropTypes.string,
  errorMessage: PropTypes.string,
  isCacheResponses: PropTypes.bool,
  isTriggerReadyEvent: PropTypes.bool,
  loadingClassName: PropTypes.string,
  loadingMessage: PropTypes.string,
  networkErrorMessage: PropTypes.string,
  readyEvent: PropTypes.string,
};
