import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    poster_path: {type: String, required: true},
    vote_average: {type: String, required: true},
    
})

export const MovieModel= mongoose.model("movie", MovieSchema);