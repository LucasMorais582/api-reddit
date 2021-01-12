import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableColumnTitle1610436818545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('posts', 'title');

      await queryRunner.addColumn(
        'posts',
        new TableColumn({
          name: 'title',
          type: 'text',
          default: null,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('posts', 'title');

      await queryRunner.addColumn(
        'posts',
        new TableColumn({
          name: 'title',
          type: 'text',
        }),
      );
    }

}
