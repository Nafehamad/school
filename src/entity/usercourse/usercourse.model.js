import Sequelize from 'sequelize';
import { sequelize } from '../../database/database';


const UserCourse = sequelize.define('userCourse', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    finished: {
        type: Sequelize.BOOLEAN,
        allowNull: true,


    }
}, {
    timestamps: true,
    freezeTableName: true
});


export {
    UserCourse
}

