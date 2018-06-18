const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    profileImageSrc: {
      type: String
    },
    title: {
      type: String
    },
    company: {
      type: String
    },
    eMail: {
      type: String,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phoneNumber: {
      type: String
    },
    mobilePhoneNumber: {
      type: String
    },
    websiteUrl: {
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
    notes: {
      type: String
    },
    tags: {
      type: [String]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
