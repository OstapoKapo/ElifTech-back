const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{ type: String, require: true },
    email:{ type: String, require: true },
    password:{ type: String, require: true },
    profileImg: {type: String, require: false},
    cars: [{
        _id: String,
        name: String,
        mileage: Number,
        averageSpeed: Number,
        history: [{
            description: String,
            date: String
        }],
        carImg: String,
        oil: {
            lastChange: String,
            nextChange: {
                date: String,
                mileage: Number,
            }
        },
        filter: {
            lastChange: String,
            nextChange: {
                date: String,
                mileage: Number,
            }
        }
    }],
})

const User = mongoose.model('User',userSchema);

module.exports = User;