import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProblemSolutionTemplatesTable1672122221143
  implements MigrationInterface
{
  problemSolutionTemplates = new Table({
    name: 'problem_solution_templates',
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
      },
      {
        name: 'programmingLanguage',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'template',
        type: 'longtext',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['problemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'problems',
        onDelete: 'CASCADE',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.problemSolutionTemplates, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.problemSolutionTemplates, true, true);
  }
}
