import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCodeFieldDataType1675998023108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `submissions` MODIFY COLUMN `code` LONGTEXT NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Do nothing
  }
}
