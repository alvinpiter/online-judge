import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ProblemsPageQueryStringObjectBuilder } from "../../helpers/ProblemsPageQueryStringObjectBuilder";
import { OffsetPaginationContextProvider } from "../../../../lib/contexts/OffsetPaginationContext";
import { useCurrentQueryString } from "../../../../lib/general/useCurrentQueryString";
import { Problem, ProblemsFilter, ProblemsOrderOption } from "../../interfaces";
import { UserProblemsContext } from "./context";
import { ROUTES } from "../../../../constants/Routes";
import { useGetUserProblemsRequest } from "../../hooks/useGetUserProblemsRequest";

interface UserProblemsContextProviderProps {
  children?: ReactNode;
}

export const UserProblemsContextProvider: FC<
  UserProblemsContextProviderProps
> = ({ children }) => {
  const navigate = useNavigate();

  const currentQueryString = useCurrentQueryString();
  const qsObjectBuilder = new ProblemsPageQueryStringObjectBuilder(
    currentQueryString
  );

  return (
    <OffsetPaginationContextProvider<
      Problem,
      ProblemsFilter,
      ProblemsOrderOption
    >
      Context={UserProblemsContext}
      qsObjectBuilder={qsObjectBuilder}
      getEntitiesRequestHook={useGetUserProblemsRequest}
      onQsObjectChange={(qsObject) =>
        navigate(ROUTES.USER_PROBLEMS_ROUTE.generatePath({}, qsObject))
      }
    >
      {children}
    </OffsetPaginationContextProvider>
  );
};
