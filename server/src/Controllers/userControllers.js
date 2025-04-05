const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const createtoken = (_id) => {
    const secretkey = process.env.JSONWEB_TOKEN;
    return jwt.sign({_id}, secretkey, {expiresIn: '7d'});
}

const reqisterUser = async (req, res) => {

    try{
        const {name, email, password} = req.body;

        let user = await userModel.findOne({ email })
    
        if(user) return res.status(400).json
        ("User with the given email already exists");
    
        if(!email || !name || !password) return res.status(400).json
        ("All fields are required");
    
        //Valid email
        if(!validator.isEmail(email)) return res.status(400).json
        ("Email must be a valid email")
    
        //valid password
        if(!validator.isStrongPassword(password)) return res.status(400).json
        ("Password must be a strong password")
    
        user = new userModel({name, email, password});
    
        //Hash the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    
        await user.save();
    
        const token = createtoken(user._id)
    
        res.status(200).json({_id: user._id, name, email, token})
    }catch(error) {
        console.log(error);
        res.status(500).json(error)
    }

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email })

        if(!user) return res.status(400).json("Invalid email or password")
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) return res.status(400).json("Password is not a valid password")

        const token = createtoken(user._id);

        res.status(200).json({ _id: user.id, name: user.name, email, token })
    }catch(error) {
        console.log(error);
        res.status(500).json(error)
    }
};

// Get all users
const getUser = async (req, res) => {
    try {
        const users = await userModel.find().select("-password")
        
        if(!users) return res.status(400).json("No users found")
        res.status(200).json(users)

    }catch(error) {
        console.log(error);
        res.status(500).json(error)
    }
};
// Find a user by ID and remove the password field from the response
const findUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userModel.findById(userId).select("-password")

        if(!user) return res.status(400).json("User not found")

        res.status(200).json(user)
    }catch(error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = { reqisterUser, loginUser, findUser, getUser }