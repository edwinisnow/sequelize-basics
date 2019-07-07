var Sequelize = require('sequelize');

var connection = new Sequelize('demo_schema', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

var Article = connection.define('atricle', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

connection.sync();
