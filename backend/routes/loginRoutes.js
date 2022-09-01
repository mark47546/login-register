const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();
app.use(bodyParser.json());

router.post('/register', async(req, res) => {
    const {name ,email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({msg:"Name, Email and Password are required"})
    }

    if(password.length < 8){
        return res.status(400).json({msg:"Password should be at least 8 characters"})
    }

    const user = await UserSchema.findOne({email});

    if(user){
        return res.status(400).json({msg:"User already exists"})
    }

    const newUser = new UserSchema({name, email, password});

    //hashing passwordd
    bcrypt.hash(password, 7, async(err, hash) => {
        if(err){
            return res.status(400).json({msg:"Error while saving password"})
        }

        newUser.password = hash
        const savedUserRes = await newUser.save()

        if(savedUserRes){
            res.send(newUser)
            return res.status(200).json({msg:"User is successfully saved"})
        }
    });
});


router.post('/login', async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({msg:"Email is not valid or password is wrong"})
    }
    //find user in db
    const user = await UserSchema.findOne({email:email});
    if(!user){
        return res.status(400).json({msg:"User not found"})
    }
    //comparing password with hashed password
    const matchPassword = await bcrypt.compare(password, user.password);
    if(matchPassword){
        const userSession = {email: user.email}
        req.session.user = userSession
        return res.status(200).json({msg:"Log in successfully"})
    }else{
        return res.status(400).json({msg:"Email is not valid or password is wrong"})
    }
});

module.exports = router