const User = require('../../models/User.model');
const Question = require('../../models/Question.model');
const bcrypt = require('bcryptjs');

async function signInUser(req, res) {
    const user  = req.body.user;

    user.password = await bcrypt.hash(user.password, 5);

    try {
        const checkUser = await User.findOne({email: user.email});
        const checkUserName = await User.findOne({name: user.name});
        if(checkUser || checkUserName){
            res.status(202).json({checkUser});
        }else{
            const newUser = new User(user);
            await newUser.save();

            res.status(200).json({newUser});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}
async function changeImgDbUser(req, res) {
    const sessionUser  = req.body.sessionUser;
    try {
        const dbUser = await User.findOne({email: sessionUser.email});
        if(dbUser){
            // if DbUser has Profile Image
            await  User.updateOne({email: sessionUser.email}, {profileImg: sessionUser.image});
            res.status(200).json();
        }else{
            res.status(201).json();
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

async function getDbUserAndQuestions(req, res) {
    const sessionEmail  = req.body.sessionEmail;
    try {
        const dbUser = await User.findOne({email: sessionEmail});
        const surveys = await Question.find({});
        if(dbUser){
            res.status(200).json({
                dbUser: dbUser,
                surveys: surveys
            });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}
async function loadSurveyToDb(req, res) {
    const userEmail  = req.body.userEmail;
    const surveyName = req.body.survey.name
    try {
        const survey = await Question.findOne({name:surveyName})
        if(survey){
            res.status(201).json();
        }else{
            const newSurvey = new Question(req.body.survey);
            await newSurvey.save();
            const surveys =  await Question.find({});
            console.log(201)
            const newUser = await User.findOneAndUpdate(
                { email: userEmail },
                { $push: { userQuestions: surveyName } },
                { new: true }
            );
            res.status(200).json({
                surveys: surveys,
                dbUser: newUser
            });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

async function uploadResult(req, res) {
    console.log("Request received:", req.body);  // Лог
   const userRate = req.body.userRate;
   const result = req.body.result;
    const userResults = {
        surveyName: result.surveyName,
        userTime: result.userTime,
        userResult:result.userResult
    }
    const surveyResult = {
        userName: result.userName,
        userTime: result.userTime,
        userResult: result.userResult
    }
    console.log(surveyResult)
    console.log(userResults)
   try {
       const user = await User.findOneAndUpdate(
           { email: result.userEmail },
           { $push: { passedQuestions: userResults } },
           { new: true }
       );

       const survey = await Question.findOneAndUpdate(
           { name: result.surveyName},
           { $push: { results: surveyResult, rate:userRate} },
           { new: true }
       );
       console.log(survey)
       res.status(200).json({
           user,
           survey,
       });
   }catch (err){
        console.log(err.message)
       res.status(500).json({ message: err.message });
   }
}



module.exports = { signInUser, changeImgDbUser, getDbUserAndQuestions, loadSurveyToDb, uploadResult }
