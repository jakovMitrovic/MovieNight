import express from "express";
import jwt from "jsonwebtoken";
import { MovieModel } from "../models/Movies.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";


const router = express.Router();



router.post("/", async (req, res) => {
    const { id, title, poster_path, vote_average } = req.body;
    const movie = await MovieModel.findOne({ id: id })
    if (!movie) {
        const newMovie = new MovieModel({ id: id, title: title, poster_path: poster_path, vote_average: vote_average })
        await newMovie.save()
        res.json({ message: "OK"});
    }

})



/// saveMovie

router.put("/", verifyToken, async (req, res) => {
    
    try {
        const { id } = req.body;
        const user = await UserModel.findById(req.body.userID)

        
        if(user.savedMovies.includes(id)){
            return res.json({ savedMovies: user.savedMovies })
        }

        user.savedMovies.push(id)
        await user.save()
        res.json({ savedMovies: user.savedMovies })

    } catch (error) {
        res.json(error)
    }

})

router.put("/removeSaved", verifyToken, async (req, res) => {
    
    try {
        const { id } = req.body;
        const user = await UserModel.findById(req.body.userID)

        var index = user.savedMovies.indexOf(id);
        if (index !== -1) {
            user.savedMovies.splice(index, 1);
        }

        
        
 
        await user.save()
        res.json({ savedMovies: user.savedMovies })

    } catch (error) {
        res.json(error)
    }

})

router.get('/savedMovies/ids', verifyToken, async (req, res) => {
    try {
        const user = await MovieModel.findById(req.params.id)
        res.json({ savedMovies: user?.savedMovies })
    } catch (error) {
        res.json(error)
    }
})


router.get('/savedMovies/id/:userID', verifyToken, async (req, res) => {
    try {
        
        const user = await UserModel.findById(req.params.userID)
        console.log(user.savedMovies)
        res.json({ savedMovies: user?.savedMovies })
    } catch (error) {
        res.json(error)
    }
})



router.get(`/:id`, async(req, res)=>{
    try {
        
        
        const movie = await MovieModel.findOne({id:req.params.id})
        res.json(movie)
        
    } catch (error) {
        res.json(error)
    }
})


router.get('/savedMovies/:id', verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const savedMovies = await MovieModel.find({
            id: { $in: user.savedMovies }
        })
        res.json({ savedMovies })
    } catch (error) {
        res.json(error)
    }
})












export { router as movieRouter }