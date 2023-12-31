import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import postRoutes from './routes/posts.js';
import User from './models/user.js';
import Post from './models/post.js';
import { users, posts } from './data/index.js';

//Middleware configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //These two are only used when using ES6 modules (import)
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}))
app.use(morgan('common'));
app.use(bodyParser.json( {limit: "30mb", extended: true})); //Limit is used to limit the size of the image
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true})); //urlencoded is used to send the data from the frontend to the backend
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //Set directory of where we keep our assets (images)

//File Storage
const storage = multer.diskStorage({ //DiskStorage is used to store the files on the disk. Configuration is gotten from multer github repo
    destination: function(req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

//Mongoose Setup
const PORT = process.env.PORT || 4001; //Port is set to 4001 if no port is specified in the .env file
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

    // //Populate database with dummy data but since there is a chance of duplicates being added, we will only run this once
    // User.insertMany(users)
    // Post.insertMany(posts)
    
})
.catch((error) => console.log(`${error} did not connect`));

//File routes
app.post('/auth/register', upload.single('picture'), register); //This route is not in route file as we need to use the upload variable. We need to set it in the index.js file.
app.post('/posts', verifyToken, upload.single('picture'), createPost);

//Routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)






