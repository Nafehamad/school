import Sequelize from 'sequelize';
import { sequelize } from '../../database/database';


const Grade = sequelize.define('grades', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    result: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

}, {
    timestamps: true,
    freezeTableName: true
});


export {
    Grade
}

