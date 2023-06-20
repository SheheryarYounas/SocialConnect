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
