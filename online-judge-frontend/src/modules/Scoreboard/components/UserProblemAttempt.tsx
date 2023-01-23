import { FC } from "react";
import { UserProblemAttempt } from "../../Problem/interfaces";

interface UserProblemAttemptProps {
  userProblemAttempt?: UserProblemAttempt;
}

export const UserProblemAttemptCellContent: FC<UserProblemAttemptProps> = ({
  userProblemAttempt,
}) => {
  if (!userProblemAttempt) {
    return null;
  }

  if (
    userProblemAttempt.firstSolvedAt !== null &&
    userProblemAttempt !== undefined
  ) {
    return <p> AC </p>;
  } else {
    return <p> Not AC, {userProblemAttempt.numberOfAttempts} attempts </p>;
  }
};
