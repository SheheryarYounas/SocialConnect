import Post from '../models/post.js'
import User from '../models/user.js'

//Create
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const User = await User.findById(userId)
        const newPost = newPost({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save()

        const post = await Post.find(); //We are going to send all the posts to the frontend and has the updated list of posts

        res.status(201).json(post); //201 is the status code for created
    }

    catch(err)
    {
        res.status(409).json({ error: err.message }) //409 is the status code for conflict
    }
}

//Read

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    }

    catch(err)
    {
        res.status(404).json({ error: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.find();
        res.status(200).json(post);
    }

    catch(err)
    {
        res.status(404).json({ error: err.message })
    }
}

//Update

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if (isLiked)
        {
            post.likes.delete(userId)
        }

        else
        {
            post.likes.set(userId, true) //We are using a map to keep track of the users that liked the post
        }

        const updatedPost = await Post.findByIdAndUpdate( //We are going to update the post with the new likes
            id,
            { likes: post.likes },
            { new: true } //Returns the new updated post
        )

        res.status(200).json(updatedPost);

    }

    catch(err)
    {
        res.status(404).json({ error: err.message })
    }
}