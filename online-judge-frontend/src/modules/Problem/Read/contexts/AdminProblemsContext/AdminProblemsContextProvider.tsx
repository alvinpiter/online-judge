import { FC, ReactNode, useEffect, useState } from "react";
import { getNumberOfPages } from "../../../../Pagination/helpers";
import { Problem } from "../../../interfaces";
import { useGetAdminProblemsRequest } from "../../hooks/useGetAdminProblemsRequest";
import { AdminProblemsFilter } from "../../interfaces";
import { AdminProblemsContext } from "./context";

interface AdminProblemsContextProviderProps {
  handlePageChange: (newPage: number) => void;
  handleFilterChange: (newFilter: AdminProblemsFilter) => void;

  page?: number;
  filter?: AdminProblemsFilter;
  children?: ReactNode;
}

export const AdminProblemsContextProvider: FC<
  AdminProblemsContextProviderProps
> = ({ page, filter, children, handlePageChange, handleFilterChange }) => {
  const numberOfProblemsPerPage = 2;
  const currentPage = page || 1;
  const [numberOfPages, setNumberOfPages] = useState(0);

  const { isLoading: isLoadingProblems, result: getAdminProblemsResult } =
    useGetAdminProblemsRequest(numberOfProblemsPerPage, currentPage, filter);

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
        problems,
        handleFilterChange,
        handlePageChange,
      }}
    >
      {children}
    </AdminProblemsContext.Provider>
  );
};
