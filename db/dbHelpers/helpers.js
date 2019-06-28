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

const getRatings = locationId => Ratings.findAll({
  where: {
    locationId,
  },
});

const getComments = () => Comment.findAll({});

const postComment = (locationId, text, userId) => {
  return Comment.create({
    locationId,
    text,
    userId,
  });
};

const postRating = locationId => Ratings.create({
  rating: 1,
  locationId,
});

const downRating = locationId => Ratings.create({
  rating: -1,
  locationId,
});

module.exports = {
  signUpUser,
  saveLocation,
  getRatings,
  getLocID,
  bulkLocations,
  getComments,
  postRating,
  downRating,
  postComment,
};
