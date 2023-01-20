import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserProblemAttemptsTable1674108860306
  implements MigrationInterface
{
  userProblemAttempts = new Table({
    name: 'user_problem_attempts',
    columns: [
      {
        name: 'id',
        type: 'bigint',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'userId',
        type: 'bigint',
        isNullable: false,
      },
      {
        name: 'problemId',
        type: 'bigint',
        isNullable: false,
      },
      {
        name: 'numberOfAttempts',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'firstSolvedAt',
        type: 'datetime',
        isNullable: true,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      },
      {
        columnNames: ['problemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'problems',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userProblemAttempts, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userProblemAttempts, true, true);
  }
}
