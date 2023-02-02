import { UserProblemAttempt } from 'src/modules/problems/entities/user-problem-attempt.entity';

export function createUserProblemAttempt(
  id: number,
  userId = 1,
  problemId = 1,
  numberOfAttempts = 0,
  firstSolvedAt = null,
) {
  const userProblemAttempt = new UserProblemAttempt();
  userProblemAttempt.id = id;
  userProblemAttempt.userId = userId;
  userProblemAttempt.problemId = problemId;
  userProblemAttempt.numberOfAttempts = numberOfAttempts;
  userProblemAttempt.firstSolvedAt = firstSolvedAt;

  return userProblemAttempt;
}
