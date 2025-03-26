const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signIn', authController.signInUser);
router.post('/changeImgDbUser', authController.changeImgDbUser);
router.post('/getDbUserAndQuestions', authController.getDbUserAndQuestions);
router.post('/loadSurveyToDb', authController.loadSurveyToDb);
router.post('/uploadResult', authController.uploadResult);

module.exports = router;