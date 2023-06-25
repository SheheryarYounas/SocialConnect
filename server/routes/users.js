import express from 'express'
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

//Read
router.get('/:id', verifyToken, getUser) //Frontend sends a particular user's id to the backend and the backend returns the user's data. This is an example of a query string
router.get('/:id/friends', verifyToken, getUserFriends)

//Update
router.patch('./:id/:friendId', verifyToken, addRemoveFriend)

export default router;
