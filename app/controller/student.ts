import Student from '@model/student';
import BaseController from '@common/baseController';
import { Controller, Body, Get, Post, Delete, Put, Query, Param, ParseIntPipe } from 'egg-pig';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';


@Controller("students")
export class StudentController extends BaseController {

    /**
     * @param page 
     * @param size 
     * @param sort 
     * @param order 
     */
    @Get()
    async list(
        @Query('page') page: number,
        @Query('size') size: number,
        @Query('sort') sort: string,
        @Query('order') order: string,
    ) {
        const { service, app } = this;
        const data = await service.student.list(page, size, sort, order);
        await app.redis.set('foo', 'bar');
        return { data };
    }

    @Get(":id")
    async get(@Param('id', ParseIntPipe) id: number) {

        const { service } = this;

        const student = await service.student.get(id);

        return { data: student };
        // 接口超时设置
        // return from([2000]).pipe(delay(1000));
    }

    @Post()
    async save(
        @Body() student: Student
    ) {

        const { service } = this;
        await service.student.save(student);
    }

    @Put(":id")
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() student: Student,
    ) {
        const { service } = this;
        const data = await service.student.udpate(id, student);
        return { data, msg: "更新成功" }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {

    }

}