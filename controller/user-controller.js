const User = require('../model/User');
const mongoose = require('mongoose');

class UserContoller{
    async getAllUsers(req,res){
        let users;
        try {
            users = await User.find();
        } catch (error) {
            return next(error);
        }
        if (!users) {
            return res.status(500).json({ message: "User not found" });
        }
    
        return res.status(200).json({
            message: "user api called successfully",
            users: users
        });
    }


    async addUser(req,res){
        try {
            const { name, email, password } = req.body;
            console.log(req.body);
    
            if (!name.trim() || !email.trim() || !password.trim()) {
                return res.status(422).json({ message: "Invalid data!" });
            }
    
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name: name,
                email: email,
                password : password
              });
    
              const user = await newUser.save();    
            // const user = await User.create(req.body);
            if (!user) {
                return res.status(500).json({ message: "Internal server error for add user" });
            }
            return res.status(201).json({
                message: "user added successfully",
                user: user
            });
        } catch (error) {
            console.error("error ", error);
            if (error.code === 11000) {
                // Duplicate key error
                return res.status(500).json({
                    message: "Email address is already in use.",
                    error: error
                });
            } else {
                // Other errors
                return res.status(500).json({
                    message: "User add error",
                    error: error
                });
            }
        }
    }

    async deleteUser(req,res){
        try {
            // Find the user by email and delete it
            const _id = req.params._id;
            console.log("userid for delete : ",_id);
            const deletedUser = await User.findOneAndDelete({ _id });
            console.log("deleted user : ",deletedUser);
            if (!deletedUser) {
              // If the user does not exist
              return res.status(500).json({
                message: "User Not Found",
                users: deletedUser
            });
        
            }
        
            console.log('User deleted successfully');
            // Return the deleted user object
            return res.status(200).json({
                message: "user deleted successfully",
                users: deletedUser
            });
          } catch (error) {
            // Handle errors
            console.error('Error:', error.message);
            return res.status(500).json({
                message: "User delete error",
                error: error
            });
          }
    }

    async deleteAllUsers(req,res){
        try {
            // Delete all documents from the User collection
            const result = await User.deleteMany({});
            console.log(`Deleted ${result.deletedCount} documents`);
            return res.status(200).json({
                message: "All user deleted successfully"
            });    
          } catch (error) {
            console.error('Error:', error.message);
            return res.status(500).json({
                message: "User delete error",
                error: error
            });
          }
    }

}

module.exports.UserContoller = UserContoller;