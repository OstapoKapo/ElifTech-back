const User = require('../../models/User.model');
const Question = require('../../models/Question.model');
const bcrypt = require('bcryptjs');

async function signInUser(req, res) {
    const user  = req.body.user;

    user.password = await bcrypt.hash(user.password, 5);

    try {
        const checkUser = await User.findOne({email: user.email});
        if(checkUser){
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

async function getDbUser(req, res) {
    const sessionEmail  = req.body.sessionEmail;
    try {
        const dbUser = await User.findOne({email: sessionEmail});
        if(dbUser){
            res.status(200).json({dbUser});
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { signInUser, changeImgDbUser, getDbUser }
