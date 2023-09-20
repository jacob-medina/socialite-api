const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;

const { Thought, User } = require('../../models');

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find({})
            .populate({ path: 'userId', select: 'username'})
            .exec();
        res.status(200).json(thoughtData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// GET single thought
router.get('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findById(
            new ObjectId(req.params.id))
            .populate({ path: 'userId', select: 'username'})
            .exec();

        if (!thoughtData) {
            res.status(404).json({ message: "Could not find thought with that ID." });
            return;
        }

        res.status(200).json(thoughtData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// POST new thought
router.post('/', async (req, res) => {
    try {
        const { thoughtText, userId } = req.body;

        if (thoughtText == null) {
            res.status(400).json({ message: "Thought text required." });
            return;
        }
        if (userId == null) {
            res.status(400).json({ message: "User ID required." });
            return;
        }

        const userData = await User.findById(new ObjectId(userId));

        if (!userData) {
            res.status(404).json({ message: "Could not find user with that ID." });
            return;
        }

        const thoughtData = await Thought.create({
            thoughtText: thoughtText,
            userId: userId
        });

        await User.findByIdAndUpdate(new ObjectId(userId), {
            $addToSet: { thoughts: thoughtData._id }
        });

        res.status(200).json(thoughtData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// PUT update thought
router.put('/:id', async (req, res) => {
    try {
        const { thoughtText } = req.body;
    
        if (!thoughtText) {
            res.status(400).json({ message: "Thought text required." });
            return;
        }
    
        const thoughtData = await Thought.findByIdAndUpdate(
            new ObjectId(req.params.id),
            { thoughtText: thoughtText },
            { new: true }
        );
    
        if (!thoughtData) {
            res.status(404).json({ message: "Could not find thought by that ID." });
            return;
        }
    
        res.status(200).json(thoughtData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
});

// DELETE thought
router.delete('/:id', async (req, res) => {
    try {
        const thoughtData = await Thought.findByIdAndDelete(new ObjectId(req.params.id));

        if (!thoughtData) {
            res.status(404).json({ message: "Could not find thought with that ID." });
            return;
        }

        await User.findByIdAndUpdate(
            new ObjectId(thoughtData.userId),
            {
                $pull: { thoughts: thoughtData._id }
            },
            { new: true }
        );

        res.status(200).json(thoughtData);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
})

module.exports = router;