const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const cookie = require("cookie");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [6, "Password Length Should Be 6 Charater Long"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number is Required"],
    minlength: [10, "Number Length Should Be 10 Charater Long"],
    maxlength: [10, "Number Length Should Be 10 Charater Long"],
  },
});

//Hash password
userSchema.pre("save", async function (next) {
  //update
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//SIGN JWT
userSchema.methods.signInToken = function (res) {
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
  );
  const refressToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIREIN }
  );
  res.cookie(refressToken, `${refressToken}`, {
    maxAge: 86400 * 7000,
    httpOnly: true,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
