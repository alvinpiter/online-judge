import { FunctionComponent, ReactNode, useEffect } from "react";
import { useBackendHealth } from "../hooks/useBackendHealth";
import { BackendHealthCheckContext } from "./context";

interface Props {
  children?: ReactNode;
}

export const BackendHealthCheckContextProvider: FunctionComponent<Props> = ({
  children,
}) => {
  const { result, error, requestFunction } = useBackendHealth();

  useEffect(() => {
    requestFunction();
  }, []);

  return (
    <BackendHealthCheckContext.Provider
      value={{
        result: result ? JSON.stringify(result) : JSON.stringify(error),
        recheck: requestFunction,
      }}
    >
      {children}
    </BackendHealthCheckContext.Provider>
  );
};
