const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { User } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find({});
        res.status(200).json(userData);
    } 
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// GET single user and populate friend/thought data
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findById(new ObjectId(req.params.id));
        
        if (!userData) {
            res.status(404).json({ message: "Could not find user with that ID." });
            return;
        }

        await userData.populate(['friends', 'thoughts']);

        res.status(200).json(userData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// POST new user
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            email: req.body.email
        });

        res.status(200).json(newUserData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// PUT update user info
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(
            new ObjectId(req.params.id),
            {
                username: req.body.username,
                email: req.body.email
            },
            {
                runValidators: true,
                new: true
            });
        
        if (!userData) {
            res.status(404).json({ message: "Could not find user with that ID." });
            return;
        }

        res.status(200).json(userData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.findByIdAndDelete(new ObjectId(req.params.id));
        
        if (!userData) {
            res.status(404).json({ message: "Could not find user with that ID." });
            return;
        }

        res.status(200).json(userData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// POST new friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const friendData = await User.findById(new ObjectId(req.params.friendId));
        
        if (!friendData) {
            res.status(404).json({ message: "Could not find friend user with that ID." });
            return;
        }

        const userData = await User.findByIdAndUpdate(
            new ObjectId(req.params.userId),
            {
                $addToSet: { friends: friendData._id }
            },
            {
                new: true
            }
        );
        
        if (!userData) {
            res.status(404).json({ message: "Could not find user with that ID." });
            return;
        }

        await userData.populate(['friends', 'thoughts']);

        res.status(200).json(userData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// DELETE friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(
            new ObjectId(req.params.userId),
            {
                $pull: { friends: req.params.friendId }
            },
            {
                new: true
            }
        );
        
        if (!userData) {
            res.status(404).json({ message: "Could not find user with that ID." });
            return;
        }

        await userData.populate(['friends', 'thoughts']);

        res.status(200).json(userData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

module.exports = router;