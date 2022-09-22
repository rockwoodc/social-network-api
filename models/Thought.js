const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
        type: String,
        required: true,
      },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,  
      getters: true
    },
    id: false
  }
);

// get total count of replies on retrieval
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reaction.length;
  });



const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
