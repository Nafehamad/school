import Sequelize from 'sequelize';
import { sequelize } from '../../database/database';


const Semester = sequelize.define('semesters', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    start: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    end: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

}, {
    timestamps: true,
    freezeTableName: true

});


export {
    Semester
}