const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thoughtController');

// /api/Thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/Thoughts/<userId>/<ThoughtId>
router.route('/:userId/:ThoughtId').put(addReaction).delete(removeThought);

//delete Reactions
router.route('/:userId/:ThoughtId/:ReactionId').delete(removeReaction);



module.exports = router;
