import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/Routes";
import { OffsetPaginationContextProvider } from "../../../../lib/contexts/OffsetPaginationContext";
import { useCurrentQueryString } from "../../../../lib/general/useCurrentQueryString";
import { ScoreboardPageQueryStringObjectBuilder } from "../../helpers/ScoreboardPageQueryStringObjectBuilder";
import { useGetScoreboardRowsRequest } from "../../hooks/useGetScoreboardRowsRequest";
import { ScoreboardRow } from "../../interfaces";
import { ScoreboardRowsPaginationContext } from "./context";

interface ScoreboardRowsContextProviderProps {
  children?: ReactNode;
}

export const ScoreboardRowsPaginationContextProvider: FC<
  ScoreboardRowsContextProviderProps
> = ({ children }) => {
  const navigate = useNavigate();

  const currentQueryString = useCurrentQueryString();
  const qsObjectBuilder = new ScoreboardPageQueryStringObjectBuilder(
    currentQueryString
  );

  return (
    <OffsetPaginationContextProvider<ScoreboardRow, any, any>
      Context={ScoreboardRowsPaginationContext}
      qsObjectBuilder={qsObjectBuilder}
      getEntitiesRequestHook={useGetScoreboardRowsRequest}
      onQsObjectChange={(qsObject) =>
        navigate(ROUTES.SCOREBOARD_ROUTE.generatePath({}, qsObject))
      }
    >
      {children}
    </OffsetPaginationContextProvider>
  );
};
