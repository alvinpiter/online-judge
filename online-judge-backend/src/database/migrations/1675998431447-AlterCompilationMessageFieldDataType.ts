import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCompilationMessageFieldDataType1675998431447
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `submission_compilation_details` MODIFY COLUMN `message` LONGTEXT NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nothing
  }
}
