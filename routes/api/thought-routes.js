const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thoughtController');

// /api/Thought/<userId>
router.route('/:userId').post(addThought);

// /api/Thought/<userId>/<ThoughtId>
router.route('/:userId/:ThoughtId').put(addReaction).delete(removeThought);

//delete Reactions
router.route('/:userId/:ThoughtId/:ReactionId').delete(removeReaction);



module.exports = router;
