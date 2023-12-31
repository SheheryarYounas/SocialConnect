import User from '../models/user.js'

//Read
export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user);
    }

    catch (err)
    {
        res.status(404).json({ error: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all( //We are going to make multiple API calls and wait for all of them to finish before sending the response back to the frontend
            user.friends.map((id) => User.findById(id)) //For each friend id, we are going to find the user with that id
        )

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        })

        res.status(200).json(formattedFriends);
    }

    catch(err)
    {
        res.status(404).json({ error: err.message })
    }
}

//Update
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId))
        {
            user.friends = user.friends.filter((id) => id !== friendId) //filter function returns a new array with all the elements that pass the test implemented by the provided function
            friend.friends = friend.friends.filter((id) => id !== id) //Removes the user from the friend's friends list
            
        }

        else
        {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all( //We are going to make multiple API calls and wait for all of them to finish before sending the response back to the frontend
            user.friends.map((id) => User.findById(id)) //For each friend id, we are going to find the user with that id
        )

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        })

        res.status(200).json(formattedFriends);
    }

    catch (err)
    {
        res.status(404).json({ error: err.message })
    }
}