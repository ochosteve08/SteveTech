const UserModel = require('../models/user.models');
const NoteModel = require("../models/note.models");
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');

//@desc get all users
//@route GET /userS
//@access Private

const getAllUsers = asyncHandler(async(req,res)=>{
         const users = await UserModel.find().select('-password').lean();
        if (!users?.length){
            return res.status(400).json({message: "No users found"})
        }
        res.status(200).json(users)
})

//@desc create new users
//@route POST /user
//@access Private
const createUser = asyncHandler(async (req, res) => {
    const {username, password,roles} = req.body;
    if (!username || !password || !Array.isArray(roles)|| !roles.length){
        return res.status(400).json({message: " All fields are required"})
    }

    // check for duplicate username
    const duplicate = await UserModel.findOne({username}).lean().exec();
    if (duplicate){
        return res.status(409).json({message: "Duplicate username"})
    }
    //hash password
    const hashPassword = await bcrypt.hash(password,10);
    const userObject = {username, "password": hashPassword, roles}
    //create and store user
    const user = await UserModel.create(userObject);
    if (user){
        res.status(200).json({message:"User created successfully", user})
    }
    else {
        res.status(400).json({message:"invalid user data received"})
    }
})


//@desc update a user
//@route PATCH /user
//@access Private
const updateUser = asyncHandler(async (req, res) => {
    const {username, password, roles,active, id} = req.body;

    //confirm data
    if (
      !id ||
      !username ||
      !Array.isArray(roles) ||
      !roles.length ||
      typeof active !== "boolean"
    ) {
      return res
        .status(400)
        .json({ message: "All fields except password are required" });
    }
    const user = await UserModel.findById(id).exec();

    if (!user){
        res.status(400).json({message: "user not found"})
    }

    //check for duplicate
   const duplicate = await UserModel.findOne({username}).lean().exec();

   //allow update to original user
   if (duplicate && duplicate._id.toString() !== id ){
        return res.status(409).json({message:"duplicate username"})
   }
   user.username = username;
   user.roles = roles;
   user.active = active;

   if (password){
    const hashPassword = await bcrypt.hash(password,10);
    user.password = hashPassword
   }
   const updateUser = await user.save();
   res.json({message: `${updateUser.username} updated`, updateUser});
});


//@desc delete user
//@route DELETE /user
//@access Private
const deleteUser = asyncHandler(async (req,res) => {
    const {id} = req.body;
    if (!id){
        return res.status(400).json({message:"user id required"})
    }
    //check if user has assigned note
    const notes = await NoteModel.findOne({user:id}).lean().exec();
    if (notes){
        return res.status(400).json({message: "user has assigned notes"})
    }
    const user = await UserModel.findById(id).exec();
    if(!user){
         res.status(400).json({message: "user not found"})
    }

    const result = await user.deleteOne();
    const reply = `Username ${result.username} with ID ${result._id} deleted`
    res.json(reply)
});


module.exports ={
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
}