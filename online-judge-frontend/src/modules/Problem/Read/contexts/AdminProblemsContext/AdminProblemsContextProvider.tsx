import { FC, ReactNode, useEffect, useState } from "react";
import { getNumberOfPages } from "../../../../Pagination/helpers";
import { Problem } from "../../../interfaces";
import { useGetAdminProblemsRequest } from "../../hooks/useGetAdminProblemsRequest";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
} from "../../interfaces";
import { AdminProblemsContext } from "./context";

interface AdminProblemsContextProviderProps {
  handlePageChange: (newPage: number) => void;
  handleFilterChange: (newFilter: AdminProblemsFilter) => void;
  handleOrderChange: (newOrder: AdminProblemsOrderOption) => void;

  page?: number;
  filter?: AdminProblemsFilter;
  order?: AdminProblemsOrderOption;
  children?: ReactNode;
}

export const AdminProblemsContextProvider: FC<
  AdminProblemsContextProviderProps
> = ({
  page,
  filter,
  order,
  children,
  handlePageChange,
  handleFilterChange,
  handleOrderChange,
}) => {
  const numberOfProblemsPerPage = 5;
  const currentPage = page || 1;
  const [numberOfPages, setNumberOfPages] = useState(0);

  const { isLoading: isLoadingProblems, result: getAdminProblemsResult } =
    useGetAdminProblemsRequest(
      numberOfProblemsPerPage,
      currentPage,
      filter,
      order
    );

  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    if (getAdminProblemsResult) {
      setProblems(getAdminProblemsResult.problems);
      setNumberOfPages(getNumberOfPages(getAdminProblemsResult.meta));
    }
  }, [getAdminProblemsResult]);

  if (isLoadingProblems) {
    return <p> Loading problems... </p>;
  }

  return (
    <AdminProblemsContext.Provider
      value={{
        currentPage,
        numberOfPages,
        filter: filter || {},
        order: order || AdminProblemsOrderOption.BY_ID_ASC,
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
