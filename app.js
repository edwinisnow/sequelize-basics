// Constructor
var Sequelize = require('sequelize');

// Connection
var connection = new Sequelize('demo_schema', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: { connectTimeout: 1000 }
});

// Model Definition
var Article = connection.define('article', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

// Sync
connection.sync().then(function() {
  // Create a record
  // Article.create({
  //   title: 'demo-title',
  //   body: 'demo-body'
  // });

  // Query a record by Primary Key
  // Article.findByPk(1).then(function(article) {
  //   console.log('Log: -----> : article.dataValues', article.dataValues);
  // });

  // Query all records
  Article.findAll().then(function(articles) {
    console.log('Log: -----> : articles.length', articles.length);
  });
});
