import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class UpdateIndexInProblemSolutionTemplatesTable1675999376764
  implements MigrationInterface
{
  indexOnProblemIdAndProgrammingLanguage = new TableIndex({
    name: 'index_on_problem_id_and_programming_language',
    columnNames: ['problemId', 'programmingLanguage'],
    isUnique: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'problem_solution_templates',
      this.indexOnProblemIdAndProgrammingLanguage,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nothing
  }
}
