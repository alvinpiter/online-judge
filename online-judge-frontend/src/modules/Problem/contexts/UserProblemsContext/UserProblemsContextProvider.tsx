import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ProblemsPageQueryStringObjectBuilder } from "../../helpers/ProblemsPageQueryStringObjectBuilder";
import { OffsetPaginationContextProvider } from "../../../../lib/contexts/OffsetPaginationContext";
import { useCurrentQueryString } from "../../../../lib/general/useCurrentQueryString";
import {
  ProblemsFilter,
  ProblemsOrderOption,
  ProblemWithDetail,
} from "../../interfaces";
import { UserProblemsContext } from "./context";
import { ROUTES } from "../../../../constants/Routes";
import { useGetProblemsRequest } from "../../hooks/useGetProblemsRequest";

interface UserProblemsContextProviderProps {
  children?: ReactNode;
}

const NUMBER_OF_PROBLEMS_PER_PAGE = 20;

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
      ProblemWithDetail,
      ProblemsFilter,
      ProblemsOrderOption
    >
      Context={UserProblemsContext}
      numberOfEntitiesPerPage={NUMBER_OF_PROBLEMS_PER_PAGE}
      qsObjectBuilder={qsObjectBuilder}
      getEntitiesRequestHook={useGetProblemsRequest}
      onQsObjectChange={(qsObject) =>
        navigate(ROUTES.USER_PROBLEMS_ROUTE.generatePath({}, qsObject))
      }
    >
      {children}
    </OffsetPaginationContextProvider>
  );
};
