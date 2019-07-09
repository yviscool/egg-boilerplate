import { AbstractBaseEntity } from '../common/baseModel';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Length, IsDate, IsBoolean } from 'class-validator';

import * as crypto from 'crypto';

@Entity("student", { schema: "test" })
export default class Student extends AbstractBaseEntity {

  @Column({ length: 30 })
  @Length(1, 30)
  name: string;

  @Column("varchar", { nullable: false, length: 30, name: "english_name" })
  @Length(1, 30)
  englishName: string | null;

  @Column("tinyint", {
    transformer: {
      to(v){
        return v
      },
      from(v){
        return v === 0 || !v ? '男' : '女'
      }
    }
  })
  @IsBoolean()
  sex: boolean | null;

  @Column("varchar", { nullable: true, length: 20, name: "phone" })
  @Length(1, 20)
  phone: string | null;

  @Column("varchar", { nullable: true, length: 10, name: "grade" })
  @Length(1, 10)
  grade: string | null;

  @Column("varchar", { nullable: true, length: 10, name: "class" })
  @Length(1, 10)
  class: string | null;

  @Column("varchar", { nullable: true, length: 60, name: "school" })
  @Length(1, 60)
  school: string | null;

  @Column("varchar", { nullable: true, length: 30, name: "subject" })
  @Length(1, 30)
  subject: string | null;

  @Column("varchar", { nullable: true, length: 30, name: "username" })
  @Length(1, 30)
  username: string | null;

  @Column("varchar", { nullable: true, length: 200, name: "password", select: false })
  @Length(1, 30)
  password: string;

  @Column("varchar", { nullable: true, select: false, length: 200 })
  salt: string;

  @BeforeInsert()
  hashPassWord() {
    super.beforeInsert();
    if (this.password){
      this.salt = crypto.randomBytes(128).toString('base64');
      this.password = crypto.pbkdf2Sync(this.password, this.salt, 10000, 128, 'sha512').toString('base64');
    }
  }

  @BeforeUpdate()
  beforeUpdate() {
    super.beforeUpdate();
  }


  checkPassword(password: string) {
    if (!password) return false;
    return crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha512').toString('base64') === this.password;
  }
}
