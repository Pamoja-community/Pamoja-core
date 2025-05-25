const jwt = require('jsonwebtoken');
// const TokenBlacklist = require('../Models/logoutModel');
const SECRET_KEY = process.env.JSONWEB_TOKEN;

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, user) => {
    if (err) {
    return res.status(403).send('Forbidden');
    }
    req.user = user;
    next();
    });
    } else {
    return res.status(401).send('Authentication required');
    }
    };

//Logout the token


module.exports = authenticateJWT;