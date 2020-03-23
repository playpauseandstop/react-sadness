import { hydrate, render } from "react-dom";

export { default as EmptyResponseData } from "./components/EmptyResponseData";
export { default as ErrorData } from "./components/ErrorData";
export { default as Loading } from "./components/Loading";
export { default as Response } from "./components/Response";
export { default as SadnessProvider } from "./components/SadnessProvider";
export { default as SadnessReady } from "./components/SadnessReady";
export * from "./contexts";
export * from "./hooks";
export * from "./records";
export { isProduction } from "./utils";

export const mount = (component, container, callback) => {
  (container.childNodes.length > 0 ? hydrate : render)(
    component,
    container,
    callback
  );
};
