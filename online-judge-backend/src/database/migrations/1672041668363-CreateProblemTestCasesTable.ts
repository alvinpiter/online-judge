import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProblemTestCasesTable1672041668363
  implements MigrationInterface
{
  problemTestCases = new Table({
    name: 'problem_test_cases',
    columns: [
      {
        name: 'id',
        type: 'bigint',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'problemId',
        type: 'bigint',
      },
      {
        name: 'inputFileName',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'inputFileKey',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'outputFileName',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'outputFileKey',
        type: 'varchar',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['problemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'problems',
        onDelete: 'CASCADE',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.problemTestCases, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.problemTestCases, true, true);
  }
}
