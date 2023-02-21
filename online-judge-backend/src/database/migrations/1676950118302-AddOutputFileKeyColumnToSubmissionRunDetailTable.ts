import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOutputFileKeyColumnToSubmissionRunDetailTable1676950118302
  implements MigrationInterface
{
  outputFileKeyColumn = new TableColumn({
    name: 'outputFileKey',
    type: 'varchar',
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'submission_run_details',
      this.outputFileKeyColumn,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'submission_run_details',
      this.outputFileKeyColumn,
    );
  }
}
