import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubmissionCompilationDetailsTable1673840902593
  implements MigrationInterface
{
  submissionCompilationDetailsTable = new Table({
    name: 'submission_compilation_details',
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
        name: 'message',
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
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      this.submissionCompilationDetailsTable,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(
      this.submissionCompilationDetailsTable,
      true,
      true,
    );
  }
}
