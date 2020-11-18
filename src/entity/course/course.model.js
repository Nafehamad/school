import Sequelize from 'sequelize';
import { sequelize } from '../../database/database';


const Course = sequelize.define('courses', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    timestamps: true,
    freezeTableName: true
});

export {
    Course
}

