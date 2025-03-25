const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
        name: String,
        author: String,
        description: String,
        questions: [
            {
                type: String,
                content: String,
                answer: String
            }
        ],
        maxTime: Number,
        results: [
            {
                userName:String,
                userTime: String,
                userResult: Number
            }
        ],
})

const Question = mongoose.model('Question',questionSchema);

module.exports = Question;