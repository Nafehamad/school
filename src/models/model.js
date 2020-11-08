import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

//user mode
const User =  sequelize.define('users', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
    },
    role:{
        type: Sequelize.STRING,  
    }
},{
    timestamps:true,
    freezeTableName: true

});

//semester model
const Semester =  sequelize.define('semesters', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    start:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },
    end:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },

},{
    timestamps:true,
    freezeTableName: true
  
});

//grade model
const Grade =  sequelize.define('grades', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    
    },
    value:{
        type: Sequelize.FLOAT,
        allowNull:true
    },
    result:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },

},{
    timestamps:true,
    freezeTableName: true
});

// course model
const Course =  sequelize.define('courses', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },

},{
    timestamps:true,
    freezeTableName: true
});

//PreCourse model
const PreCourse =  sequelize.define('PreCourses', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    
},{
    timestamps:true,
    freezeTableName: true
});

//User courses
const UserCourse = sequelize.define('userCourse', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    finished: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
        
        
    }
},{
        timestamps:true,
        freezeTableName: true
});

const AuthorizedUser = sequelize.define('authorizedUser', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull:false, 
    },
    userToken: {
        type: Sequelize.STRING,
        allowNull:false, 
    }
},{
        timestamps:true,
        freezeTableName: true
});


 //built table by sequelizing all models
 (async () => {
    await sequelize.sync({ force: false});
  })();

  //set relation
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
    AuthorizedUser
}