import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/Routes";
import { OffsetPaginationContextProvider } from "../../../../lib/contexts/OffsetPaginationContext";
import { useCurrentQueryString } from "../../../../lib/general/useCurrentQueryString";
import { SubmissionsPageQueryStringObjectBuilder } from "../../helpers/SubmissionsPageQueryStringObjectBuilder";
import { useGetSubmissionsRequest } from "../../hooks/useGetSubmissionsRequest";
import {
  Submission,
  SubmissionsFilter,
  SubmissionsOrderOption,
} from "../../interfaces";
import { SubmissionsContext } from "./context";

interface SubmissionsContextProviderProps extends PropsWithChildren {}

export const SubmissionsContextProvider: FC<
  SubmissionsContextProviderProps
> = ({ children }) => {
  const navigate = useNavigate();

  const currentQueryString = useCurrentQueryString();
  const qsObjectBuilder = new SubmissionsPageQueryStringObjectBuilder(
    currentQueryString
  );

  return (
    <OffsetPaginationContextProvider<
      Submission,
      SubmissionsFilter,
      SubmissionsOrderOption
    >
      Context={SubmissionsContext}
      qsObjectBuilder={qsObjectBuilder}
      getEntitiesRequestHook={useGetSubmissionsRequest}
      onQsObjectChange={(qsObject) =>
        navigate(ROUTES.SUBMISSIONS_ROUTE.generatePath({}, qsObject))
      }
    >
      {children}
    </OffsetPaginationContextProvider>
  );
};
