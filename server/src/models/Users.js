import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    savedMovies: [{type: String, ref: "movie"}]
})

export const UserModel = mongoose.model("user", UserSchema);

