import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class UpdateIndexInSubmissionCompilationDetailsTable1675997393722
  implements MigrationInterface
{
  indexOnSubmissionId = new TableIndex({
    name: 'index_on_submission_id',
    columnNames: ['submissionId'],
    isUnique: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'submission_compilation_details',
      this.indexOnSubmissionId,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nothing
  }
}
