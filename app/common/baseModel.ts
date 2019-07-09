import { Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'
import { IsDate, IsNumber } from 'class-validator'

export abstract class AbstractBaseEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column("datetime", { nullable: true, name: "create_at" })
  @IsDate()
  createAt: Date | null;

  @Column("datetime", { nullable: true, name: "update_at" })
  @IsDate()
  updateAt: Date | null;

  @Column("tinyint", { select: false, name: "is_deleted" })
  isDeleted: boolean | null;

  beforeInsert() {
    this.createAt = this.updateAt = new Date();
  }
  beforeUpdate() {
    this.updateAt = new Date();
  }


}

export abstract class AbstractUUIDBaseEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid') uuid!: string;
  @IsNumber()
  id: number;

  @Column("datetime", { nullable: true, name: "create_at" })
  @IsDate()
  createAt: Date | null;

  @Column("datetime", { nullable: true, name: "update_at" })
  @IsDate()
  updateAt: Date | null;

  @Column("tinyint", { select: false, name: "is_deleted" })
  isDeleted: boolean | null;

  beforeInsert() {
    this.createAt = this.updateAt = new Date();
  }
  beforeUpdate() {
    this.updateAt = new Date();
  }

}