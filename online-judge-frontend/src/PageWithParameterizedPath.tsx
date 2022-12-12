import { FC } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const PageWithParameterizedPath: FC = () => {
  const params = useParams<{
    firstParameter: string;
    secondParameter: string;
  }>();

  const [queryParams] = useSearchParams();

  return (
    <div>
      <h3> Page with parameterized path </h3>
      <p> First parameter: {params.firstParameter} </p>
      <p> Second parameter: {params.secondParameter} </p>
      <p> First query parameter: {queryParams.get("firstQuery")} </p>
      <p> Second query parameter: {queryParams.get("secondQuery")} </p>
    </div>
  );
};
