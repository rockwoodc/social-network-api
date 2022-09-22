const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
import { isEmail } from 'validator';

//data to be stored for each user
const userSchema = new Schema(
    {
      userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      userEmail: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: [ isEmail, 'invalid email' ]
      },
      //??????reference the thought model??????????
      thoughts: [],
      friends: [
        {
          type: Schema.Types.ObjectId,
          //is this how you "self reference?"
          ref: "user",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
    //   id: false,
    }
  );

  userSchema.virtual('friendCount').get(function () {
    return this.friends.reduce (
        (total, friends) => total + friends.length +1,
        0
    );
  })

  // create the user model using the userSchema
const user = model("user", userSchema);

// export the user model
module.exports = user;
