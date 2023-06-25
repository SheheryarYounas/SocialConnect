import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

//Register User
export const register = async (req, res) => { //While mongodb operation is going on, the server is not going to wait for it to finish before moving on to the next operation. This is why we use async and await
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt(); //Salt is used to hash the password
        const passwordHash = await bcrypt.hash(password, salt) //Hashes the password

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 10000)
        })

        const savedUser = await newUser.save(); //Saves the user to the database
        res.status(201).json(savedUser); //201 is the status code for created
    }

    catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export const login = async (req, res) => { //Authentication
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user)
        {
            return res.status(404).json({ message: "User not found" }) //404 is the status code for not found
        }
        
        const isMatch = await bcrypt.compare(password, user.password); //Compares the password entered with the password in the database by hashing the password entered and comparing it with the hashed password in the database

        if (!isMatch)
        {
            return res.status(400).json({ message: "Invalid credentials" }) //400 is the status code for bad request
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password; //To make sure the password is not sent back to the frontend. This is to make sure password is not intercepted by a hacker
        res.status(200).json({ token, user }); //200 is the status code for ok

    }

    catch (error) {
        res.status(500).json({ error: error.message}) //500 is the status code for internal server error
    }
}
