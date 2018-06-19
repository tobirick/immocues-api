const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    profileImageSrc: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    employeeNumber: {
      type: String
    },
    title: {
      type: String
    },
    gender: {
      type: String,
      enum: ["male", "female"]
    },
    birthDate: {
      type: Date
    },
    startedWorking: {
      type: Date
    },
    stoppedWorking: {
      type: Date,
      default: null
    },
    phoneNumber: {
      type: String
    },
    mobilePhoneNumber: {
      type: String
    },
    addressCity: {
      type: String
    },
    addressStreet: {
      type: String
    },
    addressLatLng: {
      type: Object
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
