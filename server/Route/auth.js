const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list')
const bcrypt = require('bcryptjs');

// SignUp
router.post('/signup', async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(201).json({ message: "user already Exists" });
        }else{
                const hashPass = bcrypt.hashSync(password); 
        const newUser = new User({ userName, email, password: hashPass });
        await newUser.save().then(()=> res.status(201).json({message: "Sign up Successful"  }));
            }
        
    } catch (error) {
        return res.status(402).json({ message: "Internal server error" });
    }
});

// SignIn
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(201).json({ message: "User not found, please sign up first" });
        }

        const isPassword = bcrypt.compareSync(password, user.password);
        if (!isPassword) {
            return res.status(201).json({ message: "Password is incorrect, try again" });
        }
        else{
            const { password: _, ...others } = user._doc;
        return res.status(200).json({ others});
        }

        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});

module.exports = router;
