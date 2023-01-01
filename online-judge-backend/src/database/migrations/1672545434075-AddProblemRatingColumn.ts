import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddProblemRatingColumn1672545434075 implements MigrationInterface {
  problemRatingColumn = new TableColumn({
    name: 'rating',
    type: 'int',
    default: 0,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('problems', this.problemRatingColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('problems', this.problemRatingColumn);
  }
}
