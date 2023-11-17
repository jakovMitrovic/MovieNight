import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {data: Buffer, contentType: String}
})


