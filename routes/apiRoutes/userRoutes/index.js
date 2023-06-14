// index.js for the userRoutes folder

// require the user controller methods
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../../controllers/userController');

const router = require('express').Router();

// api end points for users
router.get('/', getUsers);
router.get('/:id', getSingleUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/friends/:friendId', addFriend);
router.delete('/:id/friends/:friendId', deleteFriend);

module.exports = router;