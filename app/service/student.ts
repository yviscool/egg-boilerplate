import { Service } from 'egg';
import Student from '@model/student';
import { HttpException, HttpStatus, BadRequestException } from 'egg-pig';
// import { PageRequest } from '../common/PageRequest';


export default class StudentService extends Service {

  async list(page: number, size: number, sort: string, order: string) {

    const pageInfo = this.ctx.helper.toPage({ page, size, sort, order });

    const [list, total] = await Student.findAndCount({
      ...pageInfo,
      order: { [sort || 'id']: order || 'DESC' },
      cache: true
    });

    return {
      ...pageInfo,
      list,
      total
    }

  }

  async get(id: number) {

    const student = await Student.findOne(id, { cache: true });

    if (!student) {
      throw new BadRequestException("找不到该用户");
    }

    return student;
  }


  async save(student: Student) {
    return await Student.save(student);
  }


  async udpate(id: number, student: Student) {

    const rawStudent = await this.get(id);

    // 合并对象
    await Student.merge(rawStudent, student);

    return await Student.save(rawStudent);
  }

  async delete(id: number) {

    const student = await this.get(id);

    Student.remove(student);

  }

}
