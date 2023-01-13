import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSubmissionsTable1673427885695 implements MigrationInterface {
  submissions = new Table({
    name: 'submissions',
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
        name: 'userId',
        type: 'bigint',
        isNullable: false,
      },
      {
        name: 'programmingLanguage',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'code',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'submittedAt',
        type: 'datetime',
        isNullable: false,
      },
      {
        name: 'verdict',
        type: 'varchar',
        isNullable: true,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['problemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'problems',
      },
      {
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.submissions, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.submissions, true, true);
  }
}
