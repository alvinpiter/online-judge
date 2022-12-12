import { FunctionComponent, ReactNode } from "react";
import { useBackendHealth } from "../hooks/useBackendHealth";
import { BackendHealthCheckContext } from "./context";

interface Props {
  children?: ReactNode;
}

export const BackendHealthCheckContextProvider: FunctionComponent<Props> = ({
  children,
}) => {
  const { result, error, rerequest } = useBackendHealth();

  return (
    <BackendHealthCheckContext.Provider
      value={{
        result: result ? JSON.stringify(result) : JSON.stringify(error),
        recheck: rerequest,
      }}
    >
      {children}
    </BackendHealthCheckContext.Provider>
  );
};
