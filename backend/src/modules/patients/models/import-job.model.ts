import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

@Table({ tableName: 'import_jobs', timestamps: true, updatedAt: false })
export class ImportJob extends Model<ImportJob> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: string;

  @Column(DataType.STRING(255))
  declare filename: string | null;

  @Column(DataType.INTEGER)
  declare total_rows: number | null;

  @Column(DataType.INTEGER)
  declare success_rows: number | null;

  @Column(DataType.INTEGER)
  declare failed_rows: number | null;

  @Column(DataType.STRING(30))
  declare status: string | null;

  @Column(DataType.CHAR(36))
  declare uploaded_by: string | null;
}
