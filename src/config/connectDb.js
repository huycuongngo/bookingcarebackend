const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hoidanit', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql' 
});
