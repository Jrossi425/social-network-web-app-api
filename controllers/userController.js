// require the User model
const { User } = require('../models');

// getUsers method to get all users
const getUsers = async (req, res) => {
    try {
        const userData = await User.find();
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// getSingleUser method to get a single user by id
const getSingleUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id)
            .populate('thoughts').populate('friends');
        if (!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// createUser method to create a new user
const createUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// updateUser method to update a user by id
const updateUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(
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

// deleteUser method to delete a user by id
const deleteUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndDelete(req.params.id);
        if (!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// addFriend method to add a friend to a user's friend list
const addFriend = async (req, res) => {
    try{
        const userData = await User.findByIdAndUpdate(req.params.id, {$push: {friends: req.params.friendId}}, {new: true});
        if (!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// deleteFriend method to delete a friend from a user's friend list
const deleteFriend = async (req, res) => {
    try{
        const userData = await User.findByIdAndUpdate(req.params.id, {$pull: {friends: req.params.friendId}}, {new: true});
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
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
};
