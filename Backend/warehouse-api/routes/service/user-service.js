const User = require('../models/User');

function mapUserToResponse(user) {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
    };
}

module.exports = {
    getUserById: async function (userId) {
        return await User.findById(userId);
    },
    mapUserToResponse: mapUserToResponse
};
