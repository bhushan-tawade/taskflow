const User = require("../models/User");

const getUserFromToken = async (req, res, next) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getUserFromToken;