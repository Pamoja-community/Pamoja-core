const express = require('express');
const { reqisterUser, loginUser, findUser, getUser } = require('../Controllers/userControllers')

const router = express.Router();


router.post('/register', reqisterUser);
router.post('/login', loginUser);
router.get('/find/:userId', findUser);
router.get('/find', getUser);

module.exports = router;