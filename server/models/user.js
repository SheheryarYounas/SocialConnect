import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2, //Minimum length of the name
        max: 50, //Maximum length of the name
    },

    lastName: {
        type: String,
        require: true,
        min: 2,
        max: 50,
    },

    email: {
        type: String,
        require: true,
        max: 50,
        unique: true, //Makes sure that no two users have the same email
    },

    password: {
        type: String,
        require: true,
        min: 6,
    },

    picturePath: {
        type: String,
        default: "",
    },

    friends: {
        type: Array,
        default: [],

    },

    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
}, { timestamps: true }); //Timestamps is used to get the time the user was created and updated

const User = mongoose.model('User', UserSchema);
export default User;