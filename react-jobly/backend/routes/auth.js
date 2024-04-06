"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const { user, token } = await User.authenticate(username, password);

    return res.status(200).send({ user,token });  
  } catch (err) {
    return next(err);
  }
});



/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {

  const { username, password, email, firstName, lastName } = req.body; 
  const registrationData = { username, password, email, firstName, lastName };

  try {
    const validator = jsonschema.validate(registrationData, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    
    const newUser = await User.register({ ...registrationData, isAdmin: false });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
      const { user, token } = await User.authenticate(username, password);
      if (user && token) {
          return res.status(200).send({ user, token });
      } else {
          return res.status(401).send({ error: "Invalid username or password" });
      }
  } catch (error) {
      console.error("Login error:", error);
      return res.status(500).send({ error: "Internal server error" });
  }
});




module.exports = router;
