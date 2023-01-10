import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/Routes";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
  Problem,
} from "../../interfaces";
import { useGetAdminProblemsRequest } from "../../hooks/useGetAdminProblemsRequest";
import { AdminProblemsPageQueryStringObjectBuilder } from "./AdminProblemsPageQueryStringObjectBuilder";
import { AdminProblemsContext } from "./context";
import { useCurrentQueryString } from "../../../../lib/general/useCurrentQueryString";
import { OffsetPaginationContextProvider } from "../../../../lib/contexts/OffsetPaginationContext";

interface AdminProblemsContextProviderProps {
  children?: ReactNode;
}

export const AdminProblemsContextProvider: FC<
  AdminProblemsContextProviderProps
> = ({ children }) => {
  const navigate = useNavigate();

  const currentQueryString = useCurrentQueryString();
  const qsObjectBuilder = new AdminProblemsPageQueryStringObjectBuilder(
    currentQueryString
  );

  return (
    <OffsetPaginationContextProvider<
      Problem,
      AdminProblemsFilter,
      AdminProblemsOrderOption
    >
      Context={AdminProblemsContext}
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
