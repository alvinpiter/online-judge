import QueryString from "qs";
import { useEffect, useState } from "react";
import { getNumberOfPages } from "../../../modules/Pagination/helpers";
import { OffsetPaginationRequestHook } from "../../../modules/Pagination/interfaces";
import { OffsetPaginationQueryStringObjectBuilder } from "../../../modules/Pagination/OffsetPaginationQueryStringObjectBuilder/OffsetPaginationQueryStringObjectBuilder";
import {
  DEFAULT_NUMBER_OF_ENTITIES_PER_PAGE,
  OffsetPaginationContextValue,
} from "./interfaces";

/*
TODO:
This provider is very coupled with URL's query string.
Is it a good practice?
 */
interface OffsetPaginationContextProvideProps<Entity, Filter, Order> {
  Context: React.Context<
    OffsetPaginationContextValue<Entity, Filter, Order> | undefined
  >;

  qsObjectBuilder: OffsetPaginationQueryStringObjectBuilder<Filter, Order>;
  getEntitiesRequestHook: OffsetPaginationRequestHook<Entity, Filter, Order>;

  onQsObjectChange?: (qsObject: QueryString.ParsedQs) => void;
  children?: React.ReactNode;
}

export const OffsetPaginationContextProvider = <Entity, Filter, Order>(
  props: OffsetPaginationContextProvideProps<Entity, Filter, Order>
) => {
  const {
    Context,
    qsObjectBuilder,
    getEntitiesRequestHook,
    onQsObjectChange,
    children,
  } = props;

  const currentPage = qsObjectBuilder.getPage();
  const [numberOfPages, setNumberOfPages] = useState(0);

  const [entities, setEntities] = useState<Entity[]>([]);

  const { result: getEntitiesRequestResult } = getEntitiesRequestHook(
    DEFAULT_NUMBER_OF_ENTITIES_PER_PAGE,
    currentPage,
    qsObjectBuilder.getFilter(),
    qsObjectBuilder.getOrder()
  );

  const handlePageChange = (newPage: number) => {
    const qsObject = qsObjectBuilder.setPage(newPage).build();
    onQsObjectChange && onQsObjectChange(qsObject);
  };

  const handleFilterChange = (newFilter: Filter) => {
    const qsObject = qsObjectBuilder.setFilter(newFilter).setPage(1).build();
    onQsObjectChange && onQsObjectChange(qsObject);
  };

  const handleOrderChange = (newOrder: Order) => {
    const qsObject = qsObjectBuilder.setOrder(newOrder).setPage(1).build();
    onQsObjectChange && onQsObjectChange(qsObject);
  };

  useEffect(() => {
    if (getEntitiesRequestResult) {
      setEntities(getEntitiesRequestResult.data);
      setNumberOfPages(getNumberOfPages(getEntitiesRequestResult.meta));
    }
  }, [getEntitiesRequestResult]);

  return (
    <Context.Provider
      value={{
        currentPage,
        numberOfPages,
        filter: qsObjectBuilder.getFilter(),
        order: qsObjectBuilder.getOrder(),
        entities,
        handlePageChange,
        handleFilterChange,
        handleOrderChange,
      }}
    >
      {children}
    </Context.Provider>
  );
};
