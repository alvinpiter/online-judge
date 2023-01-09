import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProblemsTable1672024192573 implements MigrationInterface {
  problemsTable = new Table({
    name: 'problems',
    columns: [
      {
        name: 'id',
        type: 'bigint',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'longtext',
        isNullable: false,
      },
      {
        name: 'state',
        type: 'varchar',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.problemsTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.problemsTable, true);
  }
}
