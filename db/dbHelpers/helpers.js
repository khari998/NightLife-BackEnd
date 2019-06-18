// To be added

// DB HELPERS
const Sequelize = require('sequelize');

const {
    User,
    Location,
    Guardians,
    Ratings,
    Users_Locations,
    Comment
} = require('../index.js');

const signUpUser = (name, phone, email) => {
    return User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            name: name,
            phone: phone,
            email: email,
        }
    })
};

const saveLocation = (location) => {
    return Location.findOrCreate({
        where: {
            name: location
        },
        defaults: {
            name: location,
        }
    })
}

const getRatings = (locationID) => {
    return Ratings.findAll({
        where: {
            locationId: locationID
        }
    })
};

const getLocID = (location) => {
    return Location.findOne({
        where: {
            name: location
        }
    }).then(loc => loc.id)
}

module.exports = {
    signUpUser,
    saveLocation,
    getRatings,
    getLocID,
}

