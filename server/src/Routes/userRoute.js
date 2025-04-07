const express = require('express');
const { reqisterUser, loginUser, logout } = require('../Controllers/userControllers')
const authenticateJWT = require('../Middleware/AuthMiddleware')
const router = express.Router();


router.post('/register', reqisterUser);
router.post('/login', loginUser);
// router.get('/find/:userId', authenticateJWT, findUser);
//Protected route
// router.get('/find', authenticateJWT, getUser);

router.get('/logout', authenticateJWT, logout);


module.exports = router;