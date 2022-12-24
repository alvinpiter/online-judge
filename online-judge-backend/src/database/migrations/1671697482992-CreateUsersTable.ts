import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1671697482992 implements MigrationInterface {
  userTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'bigint',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'username',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'hashedPassword',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'role',
        type: 'varchar',
        isNullable: false,
      },
    ],
    indices: [
      {
        columnNames: ['username'],
        isUnique: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable, true);
  }
}
