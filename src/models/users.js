import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

//user mode
const User =  sequelize.define('User', {
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
    }
},{
    timestamps:true

});

//role model
const Role =  sequelize.define('Role', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },

},{
    timestamps:true
});
//user_role model
const UserRole = sequelize.define('user_roles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
 },{
        timestamps:true,
        
  });

//set relation
User.belongsToMany(Role, { through: UserRole});
Role.belongsToMany(User, { through: UserRole });

//built table 
(async () => {
    await sequelize.sync({ force: false });
  })();

export {
    User,
    Role,
    UserRole,
  }