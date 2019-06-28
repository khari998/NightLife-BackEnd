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

const postRating = locationId => Ratings.create({
  rating: 1,
  locationId,
});

const downRating = locationId => Ratings.create({
  rating: -1,
  locationId,
});

<<<<<<< HEAD
const addGuardian = guardian => Guardians.create({
  name: guardian.name,
  number: guardian.phone,
});
=======
const diffHours = (t2, t1) => {
  let diff = (t2.getTime() - t1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
};

const updateLocationRatingAvg = (locationId) => {
  // first query ratings by location Id
  // get sum of all
  // 
  let rating_avg = 0;
  let newTime = new Date();
  Ratings.findAll({
    where: {
      locationId,
    },
  })
    .then((data) => {
      data.forEach((rating) => {
        let postTime = rating.createdAt;
        if (diffHours(newTime, postTime) <= 2) {
          rating_avg += rating.rating;
        }
      });
      // now update location w/ new rating avg
      Location.update({
        rating_avg,
      }, {
        where: { id: locationId },
      });
    });

};
>>>>>>> 8efa1b4295b9e67fa2ee8525c3b3f7d53912239b

module.exports = {
  signUpUser,
  saveLocation,
  getRatings,
  getLocID,
  bulkLocations,
  getComments,
  postRating,
  downRating,
<<<<<<< HEAD
  addGuardian,
=======
  updateLocationRatingAvg
>>>>>>> 8efa1b4295b9e67fa2ee8525c3b3f7d53912239b
};
