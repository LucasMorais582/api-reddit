import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableColumnId1610434560326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('posts', 'id');

      await queryRunner.addColumn(
        'posts',
        new TableColumn({
          name: 'id',
          type: 'integer',
          isPrimary: true,
          generationStrategy: 'increment',
          isGenerated: true,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('posts', 'id');

      await queryRunner.addColumn(
        'posts',
        new TableColumn({
          name: 'id',
          type: 'integer',
          isPrimary: true,
          generationStrategy: 'increment',
        }),
      );
    }

}
