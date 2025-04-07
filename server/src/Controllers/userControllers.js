const userModel = require("../Models/userModel");
const Blacklist = require("../Models/logoutModel");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createtoken = (_id) => {
    const secretkey = process.env.JSONWEB_TOKEN;
    return jwt.sign({_id}, secretkey, {expiresIn: '1h'});
}

//Register the user
const reqisterUser = async (req, res) => {

    try{
        const {name, email, password} = req.body;

        let user = await userModel.findOne({ email })
        //check if email already exists
        if(user) return res.status(400).json
        ("User with the given email already exists");
        //check if all the fields are provided
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
        //save the user to the database
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
        //If the user does not exist or the record provided is not valid
        if(!user) return res.status(400).json("Invalid email or password")
        const isValidPassword = await bcrypt.compare(password, user.password)
        //check if the password if it matches the record provided
        if(!isValidPassword) return res.status(400).json("Password is not a valid password")

        //const token = createtoken(user._id);
        const token = jwt.sign({ id: user._id }, process.env.JSONWEB_TOKEN, { expiresIn: '1h' });

        res.status(200).json({ _id: user.id, name: user.name, email, token })
    }catch(error) {
        console.log(error);
        res.status(500).json(error)
    }
};

// Logout user
/**
 * @route POST /auth/logout
 * @desc Logout user
 * @access Public
 */
const logout = async (req, res) => {
    try {
        //Get token from request (consistent with login format)
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) return res.status(400).json("No token provided");

        //Check if token is already blacklisted
        const isBlacklisted = await Blacklist.findOne({ token });
        if (isBlacklisted) {
            return res.status(400).json("Token already invalidated");
        }

        //Verify token before blacklisting (consistent security level)
        try {
            jwt.sign(token, process.env.JSONWEB_TOKEN);
        } catch (err) {
            return res.status(400).json("Invalid token");
        }

        //Add token to blacklist
        await Blacklist.create({ token });

        //Return success response (consistent format with login/register)
        res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { reqisterUser, loginUser, logout }