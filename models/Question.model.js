const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
        name: String,
        author: String,
        description: String,
        questions: [
            {
                text: String,
                answer: {type: String, require: false},
                types: String,
                options: {type: [{
                        text: String,
                        correct: Boolean,
                    }], require: false}
            }
        ],
        maxTime: Number,
        results: [
            {
                userName:String,
                userTime: Number,
                userResult: String
            }
        ],
        rate: [Number]
})

const Question = mongoose.model('Question',questionSchema);

module.exports = Question;