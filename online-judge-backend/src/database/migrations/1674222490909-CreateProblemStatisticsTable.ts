import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProblemStatisticsTable1674222490909
  implements MigrationInterface
{
  problemStatisticsTable = new Table({
    name: 'problem_statistics',
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
        isNullable: false,
      },
      {
        name: 'solverCount',
        type: 'int',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['problemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'problems',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.problemStatisticsTable, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.problemStatisticsTable, true, true);
  }
}
