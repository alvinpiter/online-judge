import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class UpdateIndexInSubmissionRunDetailsTable1675999606194
  implements MigrationInterface
{
  indexOnSubmissionIdAndTestCaseId = new TableIndex({
    name: 'index_on_submission_id_and_test_case_id',
    columnNames: ['submissionId', 'testCaseId'],
    isUnique: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'submission_run_details',
      this.indexOnSubmissionIdAndTestCaseId,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nothing
  }
}
