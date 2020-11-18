import Sequelize from 'sequelize';
import { sequelize } from '../database/database'
import {User} from './user/user.model';
import {Semester} from './semester/semester.model';
import {Course} from './course/course.model';
import {PreCourse} from './precourse/precourse.model';
import {Grade} from './grade/grade.model';
import {UserCourse} from './usercourse/usercourse.model';
import {AuthorizedUser} from './authorizeduser/authorizeduser.model';
import {VerifiedUser} from './verifieduser/verifieduser.model'

(async () => {
    await sequelize.sync({ force: false});
  })();

  Semester.hasMany(User,{constraints: false});//one to many relation between users and semester
  User.belongsTo(Semester,{constraints: false});//one to many relation between users and semester
  Course.hasMany(PreCourse);//one to many relation between course and preCourse
  PreCourse.belongsTo(Course);//one to many relation between course and preCourse
  Semester.hasMany(User);//one to many relation between users and semester
  User.belongsTo(Semester);//one to many relation between users and semester
  Semester.hasMany(Course);//one to many relation between course and semester
  Course.belongsTo(Semester);//one to many relation between course and semester
  User.belongsToMany(Course, { through: UserCourse});//many to many relation between user and course
  Course.belongsToMany(User, { through: UserCourse});//many to many relation between user and course
  Grade.hasOne(UserCourse);//one to many relation between users and semester
  UserCourse.belongsTo(Grade);//one to many relation between users and semester

  export {
    User,
    Semester,
    Course,
    Grade,
    PreCourse,
    UserCourse,
    AuthorizedUser,
    VerifiedUser
}