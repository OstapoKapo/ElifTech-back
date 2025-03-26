const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        profileImg: String,
        userQuestions: {type: [String], require: false},
        passedQuestions: {type: [{
                        surveyName:String,
                        userTime: Number,
                        userResult: String
                }], require: false},
})

const User = mongoose.model('User',userSchema);

module.exports = User;