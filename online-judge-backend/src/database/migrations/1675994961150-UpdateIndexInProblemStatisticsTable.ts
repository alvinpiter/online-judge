import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class UpdateIndexInProblemStatisticsTable1675994961150
  implements MigrationInterface
{
  indexOnProblemId = new TableIndex({
    name: 'index_on_problem_id',
    columnNames: ['problemId'],
    isUnique: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex('problem_statistics', this.indexOnProblemId);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nothing
  }
}
