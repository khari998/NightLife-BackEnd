// database index
require('dotenv').config();

const Sequelize = require('sequelize');
const {  
  DATABASE_NAME,
  USERNAME,
  PASSWORD,
  HOST,
  PORT,
} = process.env;

// const dbName = process.env.DATABASE_NAME || "Bourbon";
// const uName = process.env.USERNAME || "root";
// const pw = process.env.PASSWORD || "";
// const host = process.env.HOST || "localhost";

const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
  HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log('Could not connect to the database', err));

sequelize.sync({
  force: false, // Drops info in database for testing
})

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

