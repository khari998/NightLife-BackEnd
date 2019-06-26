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

const signUpUser = (name, phone, email) => {
  return User.findOrCreate({
    where: {
      email,
    },
    defaults: {
      name,
      phone,
      email,
    },
  });
};

const saveLocation = (location) => {
  return Location.create({
    name: location.name,
    address: location.address,
    type: location.type,
    long: location.long,
    lat: location.lat,
  });
};

const bulkLocations = (locations) => {
  return Location.bulkCreate(locations);
};

const getLocID = (location) => {
  return Location.findOne({
    where: {
      name: location,
    },
  }).then(loc => loc.id)
};

const getRatings = (locationID) => {
  return Ratings.findAll({
    where: {
      locationId: locationID,
    },
  });
};

const getComments = () => {
  return Comment.findAll({
  });
};


module.exports = {
  signUpUser,
  saveLocation,
  getRatings,
  getLocID,
  bulkLocations,
  getComments,
};
