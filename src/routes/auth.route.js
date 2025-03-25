const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signIn', authController.signInUser);
router.post('/changeImgDbUser', authController.changeImgDbUser);
router.post('/getDbUser', authController.getDbUser);



module.exports = router;