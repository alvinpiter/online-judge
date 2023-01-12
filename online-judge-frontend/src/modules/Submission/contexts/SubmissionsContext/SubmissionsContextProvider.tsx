import QueryString from "qs";
import { FC, PropsWithChildren } from "react";
import { OffsetPaginationContextProvider } from "../../../../lib/contexts/OffsetPaginationContext";
import { OffsetPaginationQueryStringObjectBuilder } from "../../../Pagination/OffsetPaginationQueryStringObjectBuilder/OffsetPaginationQueryStringObjectBuilder";
import { useGetSubmissionsRequest } from "../../hooks/useGetSubmissionsRequest";
import {
  Submission,
  SubmissionsFilter,
  SubmissionsOrderOption,
} from "../../interfaces";
import { SubmissionsContext } from "./context";

interface SubmissionsContextProviderProps extends PropsWithChildren {
  qsObjectBuilder: OffsetPaginationQueryStringObjectBuilder<
    SubmissionsFilter,
    SubmissionsOrderOption
  >;
  onQsObjectChange?: (qsObject: QueryString.ParsedQs) => void;
}

export const SubmissionsContextProvider: FC<
  SubmissionsContextProviderProps
> = ({ qsObjectBuilder, onQsObjectChange, children }) => {
  return (
    <OffsetPaginationContextProvider<
      Submission,
      SubmissionsFilter,
      SubmissionsOrderOption
    >
      Context={SubmissionsContext}
      qsObjectBuilder={qsObjectBuilder}
      getEntitiesRequestHook={useGetSubmissionsRequest}
      onQsObjectChange={onQsObjectChange}
    >
      {children}
    </OffsetPaginationContextProvider>
  );
};
