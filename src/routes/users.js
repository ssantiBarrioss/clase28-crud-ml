// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');
const validateUser = require('../middlewares/usersValidate')

router.get('/register', usersController.register)
router.post('/registerUser', validateUser, usersController.storeUser)

module.exports = router;