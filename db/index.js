// database index


const Sequelize = require('sequelize');
const {  
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log('Could not connect to the database', err));

sequelize.sync({
  force: true, // Drops info in database for testing
});

const User = sequelize.define('user', { 
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  profilePic: Sequelize.STRING,
  email: Sequelize.STRING,
});

const Location = sequelize.define('location', {
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  address: Sequelize.STRING,
  rating_avg: Sequelize.INTEGER,
  lat: Sequelize.FLOAT,
  long: Sequelize.FLOAT,
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

module.exports = {
  User,
  Location,
  Guardians,
  Ratings,
  Users_Locations,
  Comment
}
