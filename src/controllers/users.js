const { User } = require('../models/userSchema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.postUserController = async(req, res) => {
    const { firstName, email, password } = req.body;
    //get user info

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            email,
            password: hashedPassword
        });
        const user = await newUser.save()



        if (user) {
            return res.json({
                status: 'success',
                message: 'Created successfully',
                data: user,
            });
        }
        res.status(500).json({
            status: 'fail',
            message: 'Opps!! something went wrong',
        });
    } catch (err) {
        console.log(err);
    }
};


exports.loginController = async(req, res) => {
    const { email, password } = req.body;
    try {
        if (!email && !password) {
            return res.status(400).json({
                status: "failed",
                message: "email or password cannot be empty"
            });
        }

        //find user
        const authUser = await User.findOne({ email }).exec();
        if (!authUser) {
            return res.status(400).json({
                status: "failed",
                message: "User not found"
            })
        }
        //compare password
        const isMatch = await bcrypt.compare(password, authUser.password);

        if (isMatch) {
            const payload = {
                id: authUser.id,
                email: authUser
            }

            const authToken = await jwt.sign(payload, process.env.SECRET, {
                expiresIn: 86400,
            });
            return res.status(200).json({
                status: "success",
                message: "You've been logged in",
                token: "Bearer " + authToken
            })
        } else {
            return res.status(400).json({
                status: "failed",
                message: "email or password not correct"
            })
        }
    } catch (err) {
        res.status(500).json({
                status: "fail",
                err
            })
            // console.log(err)
    }
}