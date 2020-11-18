import Sequelize from 'sequelize';
import { sequelize } from '../../database/database';


const PreCourse = sequelize.define('PreCourses', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },

}, {
    timestamps: true,
    freezeTableName: true
});

export {
    PreCourse
}

