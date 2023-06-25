import mongoose from 'mongoose'


//We can have a separate model for comments with its own likes etc.

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map, //This is O(1) time complexity for searching
        of: Boolean
    },

    comments: {
        types: Array,
        default: []
    }




}, { timestamps: true }) //This will automatically create a createdAt and updatedAt field

const Post = mongoose.model('Post', postSchema)

export default Post;
