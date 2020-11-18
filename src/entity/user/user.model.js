import Sequelize from 'sequelize';
import { sequelize } from '../../database/database';


const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false

    }
}, {

    timestamps: true,
    freezeTableName: true,

});


export {
    User
}

