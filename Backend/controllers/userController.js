const User = require("../models/User");


// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {

    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};



// UPDATE USER PROFILE
const updateUser = async (req, res) => {
  try {

    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};



// DELETE USER
const deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};



module.exports = {
  getCurrentUser,
  updateUser,
  deleteUser
};