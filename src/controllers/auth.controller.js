const User = require('../../models/User.model');
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
        res.status(500).json({ message: err.message });
    }
}

module.exports = { signInUser }
