const List = require('../models/list');
const User = require('../models/user');
const router = require('express').Router();

// Create Slide
router.post('/addSlide', async (req, res) => {
    try {
        const { title, description, id } = req.body;
        const user = await User.findById(id);
        if (user) {
            const list = new List({ title, description, user: user._id });
            await list.save();
            user.list.push(list);
            await user.save();
            res.status(201).json({ message: "Slide added successfully", slide: list });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error adding slide:', error);
        res.status(500).json({ message: "Server connection error" });
    }
});

// Update Slide
router.put('/updateSlide/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedSlide = await List.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (updatedSlide) {
            res.status(200).json({ message: "Slide updated successfully", slide: updatedSlide });
        } else {
            res.status(404).json({ message: "Slide not found" });
        }
    } catch (error) {
        console.error('Error updating slide:', error);
        res.status(500).json({ message: "Server connection error" });
    }
});

// Delete Slide
router.delete('/deleteSlide/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.body.id,
            { $pull: { list: req.params.id } },
            { new: true }
        );
        if (user) {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Slide deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error deleting slide:', error);
        res.status(500).json({ message: "Server connection error" });
    }
});

// Get Slides for a User
router.get('/getSlide/:id', async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        if (list.length > 0) {
            res.status(200).json({ list });
        } else {
            res.status(404).json({ message: "No slides found" });
        }
    } catch (error) {
        console.error('Error fetching slides:', error);
        res.status(500).json({ message: "Server connection error" });
    }
});

module.exports = router;
