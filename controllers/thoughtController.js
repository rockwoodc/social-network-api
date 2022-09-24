const { Thought, User } = require("../models");

const ThoughtController = {
  // add Thought to User
  addThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.UserId },
          //mongodb functions start with a dollar sign
          { $push: { thought:dbThoughtData._id} },
          //let us receive the updated User w/Thoughts
          { new: true}
        );
      })
      .then((dbThoughtData) => {
        // if (!dbThoughtData) {
        //   res.status(404).json({ message: "No User found with this id!" });
        //   return;
        // }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  //add a Reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // remove Thought
  removeThought({ params }, res) {
    //deletes the User Thought and returns data
    Thought.findOneAndDelete({ _id: params.ThoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No Thought with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.UserId },
          { $pull: { Thought: params.ThoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // remove Reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $pull: { replies: { ReactionId: params.ReactionId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = ThoughtController;
