const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

logoutUser = async (req, res) => {
    res.clearCookie("token");
    return res
        .status(200)
        .json({message: "Logged Out"})
}

logInUser = async (req, res) => {
    const{email, password, user} = req.body
        if (!email || !password || !user) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
    try{
        const{email, password, user} = req.body
        if (!email || !password|| !user) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Invalid password"
                });
        }
        const theUser = await User.findOne({email: email}, (err, user) => {
            if(err){
                return res
                    .status(404)
                    .json({errorMessage: "Email not registered"})
            }
        }).catch(err => {
            return res
                .status(400)
                .json({errorMessage: "Email not registered"})
        })
        if(theUser.user !== user){
            return res
                .status(400)
                .json({errorMessage: "Invalid User Name"})
        }
        bcrypt.compare(password, theUser.passwordHash, async function(err, result){
            if(result == true){
                console.log("good");
                const token = auth.signToken(theUser);
                await res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                }).status(200).json({
                    loggedIn: true,
                    user: {
                        firstName: theUser.firstName,
                        lastName: theUser.lastName,
                        email: theUser.email,
                        userName: theUser.user
                    }
                }).send();
            }else{
                return res
                .status(404)
                .json({errorMessage: "Invalid Password"}).send();
            }
        });
    }catch(err){
        console.log(err)
        return res
                .status(404)
                .json({errorMessage: "Email not registered"}).send();
    }
}

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email
            }
        }).send();
    })
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName,user,  email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !user || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        const existingUser2 = await User.findOne({ user: user });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        if (existingUser2) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this user name already exists."
                })
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, user, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    logInUser,
    logoutUser
}