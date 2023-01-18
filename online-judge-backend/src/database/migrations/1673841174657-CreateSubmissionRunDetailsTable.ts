import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubmissionRunDetailsTable1673841174657
  implements MigrationInterface
{
  submissionRunDetailsTable = new Table({
    name: 'submission_run_details',
    columns: [
      {
        name: 'id',
        type: 'bigint',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'submissionId',
        type: 'bigint',
        isNullable: false,
      },
      {
        name: 'testCaseId',
        type: 'bigint',
        isNullable: false,
      },
      {
        name: 'output',
        type: 'mediumtext',
        isNullable: true,
      },
      {
        name: 'runTimeInMilliseconds',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'memoryUsageInKilobytes',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'verdict',
        type: 'varchar',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['submissionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'submissions',
      },
      {
        columnNames: ['testCaseId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'problem_test_cases',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.submissionRunDetailsTable, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.submissionRunDetailsTable, true, true);
  }
}
