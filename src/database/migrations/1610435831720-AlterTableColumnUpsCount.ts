import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableColumnUpsCount1610435831720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('posts', 'ups_count');

      await queryRunner.addColumn(
        'posts',
        new TableColumn({
          name: 'ups_count',
          type: 'integer',
          default: null,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('posts', 'ups_count');

      await queryRunner.addColumn(
        'posts',
        new TableColumn({
          name: 'ups_count',
          type: 'integer',
        }),
      );
    }

}
