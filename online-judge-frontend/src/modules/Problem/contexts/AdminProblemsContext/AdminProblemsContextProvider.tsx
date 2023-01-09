import { FC, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/Routes";
import { getNumberOfPages } from "../../../Pagination/helpers";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
  Problem,
} from "../../interfaces";
import { useGetAdminProblemsRequest } from "../../hooks/useGetAdminProblemsRequest";
import { AdminProblemsPageQueryStringObjectBuilder } from "./AdminProblemsPageQueryStringObjectBuilder";
import { AdminProblemsContext } from "./context";

interface AdminProblemsContextProviderProps {
  children?: ReactNode;
}

const NUMBER_OF_PROBLEMS_PER_PAGE = 5;

export const AdminProblemsContextProvider: FC<
  AdminProblemsContextProviderProps
> = ({ children }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const queryString = currentLocation.search.slice(1); // Exclude the '?'
  const qsObjectBuilder = new AdminProblemsPageQueryStringObjectBuilder(
    queryString
  );

  const numberOfProblemsPerPage = NUMBER_OF_PROBLEMS_PER_PAGE;
  const currentPage = qsObjectBuilder.getPage();
  const [numberOfPages, setNumberOfPages] = useState(0);

  const { isLoading: isLoadingProblems, result: getAdminProblemsResult } =
    useGetAdminProblemsRequest(
      numberOfProblemsPerPage,
      currentPage,
      qsObjectBuilder.getFilter(),
      qsObjectBuilder.getOrder()
    );

  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    if (getAdminProblemsResult) {
      setProblems(getAdminProblemsResult.problems);
      setNumberOfPages(getNumberOfPages(getAdminProblemsResult.meta));
    }
  }, [getAdminProblemsResult]);

  const handlePageChange = (newPage: number) => {
    const qsObject = qsObjectBuilder.setPage(newPage).build();
    navigate(ROUTES.ADMIN_PROBLEMS_ROUTE.generatePath({}, qsObject));
  };

  const handleFilterChange = (newFilter: AdminProblemsFilter) => {
    const qsObject = qsObjectBuilder.setFilter(newFilter).setPage(1).build();
    navigate(ROUTES.ADMIN_PROBLEMS_ROUTE.generatePath({}, qsObject));
  };

  const handleOrderChange = (newOrder: AdminProblemsOrderOption) => {
    const qsObject = qsObjectBuilder.setOrder(newOrder).setPage(1).build();
    navigate(ROUTES.ADMIN_PROBLEMS_ROUTE.generatePath({}, qsObject));
  };

  if (isLoadingProblems) {
    return <p> Loading problems... </p>;
  }

  return (
    <AdminProblemsContext.Provider
      value={{
        currentPage,
        numberOfPages,
        filter: qsObjectBuilder.getFilter(),
        order: qsObjectBuilder.getOrder(),
        problems,
        handleFilterChange,
        handlePageChange,
        handleOrderChange,
      }}
    >
      {children}
    </AdminProblemsContext.Provider>
  );
};
