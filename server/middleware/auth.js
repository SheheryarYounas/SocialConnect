import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if (!token)
        {
            return res.status(403).send("Access Denied") //403 is the status code for forbidden
        }

        if (token.startsWith("Bearer "))
        {
            token = token.slice(7, token.length).trimLeft(); //Remove bearer and extract everything from index 7 to the end of the token
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET) //Verify the token
        req.user = verified //Add the user to the request
        next()

    }

    catch (err)
    {
        res.status(500).json({ error: err.message })
    }
}