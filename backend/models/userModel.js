const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },

    email: {
      type: String,
      required: [true, "Please add  email"],
      unique: true,
      // Add email validation with regex
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("BlogUser", userSchema);
