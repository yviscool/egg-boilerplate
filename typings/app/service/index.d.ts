// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportStudent from '../../../app/service/student';

declare module 'egg' {
  interface IService {
    student: ExportStudent;
  }
}
