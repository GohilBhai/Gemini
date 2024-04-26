const authModel = require("../models/userModel.js");

export const addregisterapi = async (req, res) => {
  const Data = req.body;
  const UserData = new authModel(Data);
  try {
    await UserData.save();
    res.status(200).json(UserData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.registerController = async () => {};
exports.loginController = async () => {};
exports.logoutController = async () => {};
