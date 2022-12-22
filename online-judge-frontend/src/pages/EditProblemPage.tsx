import { FC } from "react";
import { useParams } from "react-router-dom";

export const EditProblemPage: FC = () => {
  const params = useParams<{ problemId: string }>();

  return (
    <div>
      <h3> Edit problem {params.problemId} </h3>
    </div>
  );
};
