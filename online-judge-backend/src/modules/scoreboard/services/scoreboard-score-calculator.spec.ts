import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { UserProblemAttempt } from 'src/modules/problems/entities/user-problem-attempt.entity';
import { createUser } from 'src/lib/tests/createUser';
import { createUserProblemAttempt } from 'src/lib/tests/createUserProblemAttempt';
import { ScoreboardScoreCalculator } from './scoreboard-score-calculator';
import { leftShift } from 'src/lib/math';
import { ScoreboardScoringSchema } from '../interfaces/scoreboard';

describe(ScoreboardScoreCalculator.name, () => {
  const userProblemAttemptsService = UserProblemAttemptsService.prototype;
  let service: ScoreboardScoreCalculator;

  beforeEach(() => {
    service = new ScoreboardScoreCalculator(userProblemAttemptsService);
  });

  describe('calculateScore', () => {
    describe('when there is solved problem', () => {
      const user = createUser(1);
      const userProblemAttempts: UserProblemAttempt[] = [
        createUserProblemAttempt(
          1,
          user.id,
          1,
          0,
          new Date('2023-01-30 17:20'),
        ),
        createUserProblemAttempt(
          2,
          user.id,
          2,
          1,
          new Date('2023-01-30 17:15'),
        ),
        createUserProblemAttempt(3, user.id, 3, 3, null),
      ];

      it('returns the correct result', async () => {
        jest
          .spyOn(
            userProblemAttemptsService,
            'getAllUserAttemptsOnPublishedProblems',
          )
          .mockResolvedValue(userProblemAttempts);

        const result = await service.getNumericScore(user);
        const expectedResult =
          leftShift(2, 42) +
          (leftShift(1, 42) - 1) -
          new Date('2023-01-30 17:20').getTime();

        expect(
          userProblemAttemptsService.getAllUserAttemptsOnPublishedProblems,
        ).toHaveBeenCalledWith(user.id);
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when there is no solved problem', () => {
      const user = createUser(1);
      const userProblemAttempts: UserProblemAttempt[] = [
        createUserProblemAttempt(1, user.id, 1, 3, null),
      ];

      it('returns the correct result', async () => {
        jest
          .spyOn(
            userProblemAttemptsService,
            'getAllUserAttemptsOnPublishedProblems',
          )
          .mockResolvedValue(userProblemAttempts);

        const result = await service.getNumericScore(user);
        const expectedResult = 0;

        expect(
          userProblemAttemptsService.getAllUserAttemptsOnPublishedProblems,
        ).toHaveBeenCalledWith(user.id);
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('decodeScore', () => {
    it.each([
      [
        leftShift(12, 42) +
          (leftShift(1, 42) - 1) -
          new Date('2023-01-30 17:20').getTime(),
        {
          solveCount: 12,
          lastSolveTimeInMilliseconds: new Date('2023-01-30 17:20').getTime(),
        },
      ],
      [0, { solveCount: 0, lastSolveTimeInMilliseconds: leftShift(1, 42) - 1 }],
    ])(
      '%s',
      async (numericScore: number, expectedResult: ScoreboardScoringSchema) => {
        const result = await service.getSchematicScore(numericScore);
        expect(result).toEqual(expectedResult);
      },
    );
  });
});
