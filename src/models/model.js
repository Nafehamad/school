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
        primaryKey:true
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
    finished:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },

},{
    timestamps:true,
    freezeTableName: true
});

// PreCourse model
const PreCourse =  sequelize.define('PreCourses', {
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


 //built table 
 (async () => {
    await sequelize.sync({ alter: true});
  })();

  //set relation
  Semester.hasMany(User,{constraints: false});//one to many relation between users and semester
  User.belongsTo(Semester,{constraints: false});//one to many relation between users and semester
  Grade.hasOne(Course);//one to one relation between grade and course
  Course.belongsTo(Grade);//one to one relation between grade and course
  Course.hasMany(PreCourse);//one to many relation between course and preCourse
  PreCourse.belongsTo(Course);//one to many relation between course and preCourse
  Semester.hasMany(User);//one to many relation between users and semester
  User.belongsTo(Semester);//one to many relation between users and semester
  Semester.hasMany(Course);//one to many relation between course and semester
  Course.belongsTo(Semester);//one to many relation between course and semester



export {
    User,
    Semester,
    Course,
    Grade,
    PreCourse,

  }