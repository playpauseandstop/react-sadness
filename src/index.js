import { hydrate, render } from "react-dom";

export { default as APIResponse } from "./components/APIResponse";
export { default as EmptyData } from "./components/EmptyData";
export { default as ErrorData } from "./components/ErrorData";
export { default as Loading } from "./components/Loading";
export { default as SadnessProvider } from "./components/SadnessProvider";
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
