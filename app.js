// Constructor
var Sequelize = require('sequelize');

// Connection
var connection = new Sequelize('demo_schema', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: { connectTimeout: 1000 }
});

// Model Definition
var Article = connection.define(
  'article',
  {
    // Shorter version
    // title: Sequelize.STRING,
    // body: Sequelize.TEXT

    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        // len: [10, 150]
        len: {
          args: [10, 150],
          msg: 'Please enter a title atleast 10 chars but not more than 150'
        }
      }
    },
    body: {
      type: Sequelize.TEXT,
      // defaultValue: 'Coming soon...'
      validate: {
        startsWithUpper: function(bodyVal) {
          var first = bodyVal.charAt(0);
          var startsWithUpper = first === first.toUpperCase();
          if (!startsWithUpper) {
            throw new Error('First letter must be a uppercase letter. ');
          }
        }
      }
    },
    slug: {
      type: Sequelize.STRING,
      primaryKey: true
    }
  },
  {
    timestamps: false,
    hooks: {
      beforeValidate: function() {
        console.log('Log: -----> : beforeValidate');
      },
      afterValidate: function() {
        console.log('Log: -----> : afterValidate');
      },
      beforeCreate: function() {
        console.log('Log: -----> : beforeCreate');
      },
      afterCreate: function(res) {
        console.log('Log: -----> : afterCreate', res.dataValues.slug);
      }
    }
  }
);

// Sync
connection
  .sync({
    force: true,
    logging: console.log
  })
  .then(function() {
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
    // Article.findAll().then(function(articles) {
    //   console.log('Log: -----> : articles.length', articles.length);
    // });

    return Article.create({
      // title: [1, 2],
      // title: 'short',
      title: 'Long valid title',
      slug: 'demo_slug',
      body: 'Demo body lowercase'
    });
  })
  .catch(function(error) {
    console.log('Log: -----> : error', error);
  });
