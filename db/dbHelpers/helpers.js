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

module.exports = {
    signUpUser,
}

