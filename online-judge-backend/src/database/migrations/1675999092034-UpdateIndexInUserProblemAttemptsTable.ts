import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class UpdateIndexInUserProblemAttemptsTable1675999092034
  implements MigrationInterface
{
  indexOnUserIdAndProblemId = new TableIndex({
    name: 'index_on_user_id_and_problem_id',
    columnNames: ['userId', 'problemId'],
    isUnique: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'user_problem_attempts',
      this.indexOnUserIdAndProblemId,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nothing
  }
}
