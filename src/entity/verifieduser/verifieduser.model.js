import Sequelize from 'sequelize';
import {sequelize} from '../../database/database'


const VerifiedUser = sequelize.define('verifiedUser', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userToken: {
        type: Sequelize.STRING,
        allowNull:false, 
    }
},{
        timestamps:true,
        freezeTableName: true
});


export {
    VerifiedUser
}
    
    