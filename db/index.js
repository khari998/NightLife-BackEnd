// database index
const Sequelize = require('sequelize');

const dbName = process.env.DATABASE_NAME || "Bourbon";
const uName = process.env.USERNAME || "OmarScrumMaster";
const pw = process.env.PASSWORD || "";
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8080;

const sequelize = new Sequelize(dbName, uName, pw, {
  host,
  port,
  dialect: 'mysql',
});

const User = sequelize.define('user', { 
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  profilePic: Sequelize.STRING,
  email: Sequelize.STRING,
});

const Location = sequelize.define('location', {
  name: Sequelize.STRING,
  rating_avg: Sequelize.INTEGER,
})

const Guardians = sequelize.define('guardians', {
  name: Sequelize.STRING,
  number: Sequelize.STRING,
  email: Sequelize.STRING,
})
Guardians.belongsTo(User);


const Ratings = sequelize.define('ratings', {
  rating: Sequelize.INTEGER,
}); // create join table as new table so it can be referenced as variable
Ratings.belongsTo(User); // define join table relationship to User
Ratings.belongsTo(Location);

const Users_Locations = sequelize.define('users_locations', {}); // create join table as new table so it can be referenced as variable
Users_Locations.belongsTo(User); // define join table relationship to User
Users_Locations.belongsTo(Location);

const Comment = sequelize.define('comment', {
  text: Sequelize.STRING,
  type: Sequelize.STRING,
}); // create join table as new table so it can be referenced as variable
Comment.belongsTo(User); // define join table relationship to User
Comment.belongsTo(Location);

