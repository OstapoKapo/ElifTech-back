const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signIn', authController.signInUser);
router.post('/changeImgDbUser', authController.changeImgDbUser);
router.post('/getDbUserAndQuestions', authController.getDbUserAndQuestions);
router.post('/loadSurveyToDb', authController.loadSurveyToDb);
router.post('/uploadResult', authController.uploadResult);
router.post('/deleteSurvey', authController.deleteSurvey);
router.post('/updateSurvey', authController.updateSurvey);

module.exports = router;