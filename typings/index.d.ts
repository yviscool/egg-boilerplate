import { Application } from 'egg';
import { Connection } from 'typeorm';
import { toPage as PageHelper } from '../app/extend/helper';

declare module 'egg' {
    export interface Application {
        model: Connection,
    }

    export interface IHelper {
        toPage: PageHelper
    }
}