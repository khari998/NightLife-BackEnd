// To be added

// DB HELPERS

const {
  User,
  Location,
  Guardians,
  Ratings,
  Users_Locations,
  Comment,
} = require('../index.js');

const signUpUser = (name, phone, email) => User.findOrCreate({
  where: {
    email,
  },
  defaults: {
    name,
    phone,
    email,
  },
});

const saveLocation = location => Location.create({
  name: location.name,
  address: location.address,
  type: location.type,
  long: location.long,
  lat: location.lat,
});

const bulkLocations = (locations) => {
  return Location.bulkCreate(locations);
};

const getLocID = location => Location.findOne({
  where: {
    name: location,
  },
}).then(loc => loc.id);

const getRatings = locationID => Ratings.findAll({
  where: {
    locationId: locationID,
  },
});

const getComments = () => Comment.findAll({});


module.exports = {
  signUpUser,
  saveLocation,
  getRatings,
  getLocID,
  bulkLocations,
  getComments,
};
