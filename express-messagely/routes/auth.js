const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");
const Router = require("express").Router;
const router = new Router();

const User = require("../models/user");
const ExpressError = require("../expressError");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async (req,res,next) => {
    try{
        let { username, password } = req.body;
        if(User.authenticate(username,password)){
            const token = jwt.sign({username}, SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({token});
        }else{
            throw new ExpressError("Username and password has already been taken. Please try again!",400);
        }
    }catch(error){
        return next(error);
    }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async (req,res,next) => {
    try{
    let { username } = await User.register(req.body);
    let token = jwt.sign({username}, SECRET_KEY)
    User.updateLoginTimestamp(username);
    return res.json({token});
    }catch(error){
        return next(error);
    }
});

module.exports = router;
