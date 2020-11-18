import Sequelize from 'sequelize';
import { sequelize } from '../../database/database';


const AuthorizedUser = sequelize.define('authorizedUser', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userToken: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    freezeTableName: true
});


export {
    AuthorizedUser
}

