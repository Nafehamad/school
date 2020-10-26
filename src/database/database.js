import Sequelize from 'sequelize';



export const sequelize = new Sequelize('school','root','',{
  host: 'localhost',
  dialect : 'mysql',
  operatorsAliases : false,// to avoid deprecation warnning
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    },
    logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

