import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createMessages1605706639482 implements MigrationInterface {
    private table = new Table({
            name: 'messages',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'user_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'content',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamptz',
                    default: 'now()',
                    isNullable: false
                },
                {
                    name: 'updated_at',
                    type: 'timestamptz',
                    default: 'now()',
                    isNullable: false
                }
            ]
        })

    private foreignKey = new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE'
    })


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table)
        await queryRunner.createForeignKey('messages', this.foreignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table)
    }

}
