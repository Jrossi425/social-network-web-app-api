// requiring the models
const { User, Thought } = require('../models');

// get all thoughts
const getThoughts = async (req, res) => {
    try {
        const userData = await Thought.find();
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }

}

// get single thought by id
const getSingleThought = async (req, res) => {
    try {
        const userData = await Thought.findById(req.params.id)
            .populate('reactions');
        if (!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// create thought
const createThought = async (req, res) => {
    try {
        const userData = await Thought.create(req.body);
        const foundUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: userData._id } },
            { new: true }
        );
        if (!foundUser) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// update thought by id
const updateThought = async (req, res) => {
    try {
        const userData = await Thought.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true });


        if (!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete thought by id
const deleteThought = async (req, res) => {
    try {
        const userData = await Thought.findByIdAndDelete(req.params.id);
        if (!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// create reaction method to add a reaction to a thought
const createReaction = async (req, res) => {
    try {
        const userData = await Thought.findByIdAndUpdate(
            req.params.id,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete reaction method to remove a reaction from a thought
const deleteReaction = async (req, res) => {
    try {
        const userData = await Thought.findByIdAndUpdate(
            req.params.id,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
}

// export the methods
module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}