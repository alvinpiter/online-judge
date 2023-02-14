import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/Routes";
import {
  ProblemsFilter,
  ProblemsOrderOption,
  ProblemWithDetail,
} from "../../interfaces";
import { useGetAdminProblemsRequest } from "../../hooks/useGetAdminProblemsRequest";
import { ProblemsPageQueryStringObjectBuilder } from "../../helpers/ProblemsPageQueryStringObjectBuilder";
import { AdminProblemsContext } from "./context";
import { useCurrentQueryString } from "../../../../lib/general/useCurrentQueryString";
import { OffsetPaginationContextProvider } from "../../../../lib/contexts/OffsetPaginationContext";

interface AdminProblemsContextProviderProps {
  children?: ReactNode;
}

const NUMBER_OF_PROBLEMS_PER_PAGE = 20;

export const AdminProblemsContextProvider: FC<
  AdminProblemsContextProviderProps
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
      Context={AdminProblemsContext}
      numberOfEntitiesPerPage={NUMBER_OF_PROBLEMS_PER_PAGE}
      qsObjectBuilder={qsObjectBuilder}
      getEntitiesRequestHook={useGetAdminProblemsRequest}
      onQsObjectChange={(qsObject) =>
        navigate(ROUTES.ADMIN_PROBLEMS_ROUTE.generatePath({}, qsObject))
      }
    >
      {children}
    </OffsetPaginationContextProvider>
  );
};
