import express from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js";


const router = express.Router();

const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret", (error)=>{
            if(error) return res.sendStatus(403);
            next();
        })
    } else{
        res.sendStatus(401)
        }
    }




router.post("/register", async (req, res)=>{
    const {username, password, image, firstName, lastName, email, dateOfBirth} = req.body;
    
     const user =  await UserModel.findOne({username: username})
    if(user){
         return res.json({message: "User alredy exist!"})
     }
    const hashedPassword = await bcrypt.hash(password, 10)
   
    const newUser = new UserModel({username: username,
                 password: hashedPassword, image: image, firstName: firstName, lastName: lastName, email:email, dateOfBirth:dateOfBirth, savedMovies:[]})
                
            
            
    await newUser.save()
    res.json({message: "User registered successfully"});



});


router.post("/login", async(req, res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({ username: username})
    
    if(!user){
        return res.json({message: "User doesn't exist"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.json({message:"Username or password is incorrect!"})
    }

    const token = jwt.sign({id:user._id}, "secret")
    res.json({token, userId: user._id})

})

router.get(`/getUser/:userId`, async(req, res)=>{
    //const {_id} = req.body;
    try {
        const user = await UserModel.findById(req.params.userId)
        res.json(user)
        
    } catch (error) {
        res.json(error)
    }
})


router.get("/getAll", async(req, res)=>{
    try {
        const response = await UserModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})


router.put("/edit", verifyToken, async (req, res) => {
    const { username, password, image, firstName, lastName, email, dateOfBirth} = req.body;
    try {
        const user = await UserModel.findById(req.body.userID)
        user.username = username;
        user.password = password;
        user.image = image;
        user.firstName = firstName;
        user.lastName = lastName;
        user.dateOfBirth = dateOfBirth;
        user.email = email;

        await user.save()
        res.json({ message:"ok" })

    } catch (error) {
        res.json(error)
    }

})



export {router as userRouter}



export {verifyToken}
