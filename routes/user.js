const express = require('express')
const router = express.Router();

const User = require('../models/usermodels.js');

//routes

//CRUD operations//

router.get('/user',async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message


        })
    }
})

// create a post api  
router.post('/user', async(req,res)=>{
    try{
        const {name,age,} = req.body;
        const newUser = new User({name,age});
        await newUser.save();
        res.status(200).json({
            success:true,
            user:newUser
        }) // save new entry in database

    }
    catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
})

//update

router.put('/users/:id',async(req,res)=> {
    const {id} = req.params;
    const {name,age} = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {name,age});
        if(!updatedUser){
            res.json({
                message:'user not found'
            })
        
        }
        res.status(200).json({
            success:true,
            user:updatedUser

        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }


})

//delete
router.delete('/users/:id', async(req,res) =>{
    const {id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            res.jason({
                message: "user not found"
            })
        }
        res.status(200).json({
            success:true,
            user: deletedUser
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }

})


module.exports = router;