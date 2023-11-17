import express from "express"
import {PORT, mongoDBURL} from "../config.js"
import mongoose from "mongoose";
import cors from "cors"
import {userRouter} from "./routes/users.js"
import {movieRouter}from "./routes/movies.js"
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json({limit: '35mb'}));

app.use(bodyParser.urlencoded({
      extended: true,
      limit: '35mb',
      parameterLimit: 50000,
    }),
)

app.use(express.json())
app.use(cors());

app.use("/auth", userRouter)

app.use("/movies", movieRouter)

app.get("/", (req, res)=>{
    console.log(req)
    return res.status(234).send(`App i running on port: ${PORT}`)
})

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("connected")
        app.listen(PORT, ()=>{
            console.log("running")
        })
    })
    .catch((error)=>{
        console.log(error)
    })


