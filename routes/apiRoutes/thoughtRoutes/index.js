// index.js for the thoughtRoutes folder

// require the thought controller methods
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../../controllers/thoughtController');

const router = require('express').Router();

// api end points for thoughts
router.get('/', getThoughts);
router.get('/:id', getSingleThought);
router.post('/', createThought);
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);
router.post('/:id/reactions', createReaction);
router.delete('/:id/reactions/:reactionId', deleteReaction);

module.exports = router;