import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email === '' || !password || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Check email is exist or not
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // check the password is correct or not
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid password"));
    }

    // create a token
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY)

    // To hide the password
    const {password: pass, ...rest} = validUser._doc;
    res.status(200).cookie('access_token', token, { httpOnly: true}).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // create a token
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY)
      // To hide the password
      const {password, ...rest} = user._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true}).json(rest);
    } else {
      // Create a random password for the new user
      const generatedPassword = Math.random().toString(36).slice(-8);
      // To hashed password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      // Create a new user
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-3),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl
      });
      // Save the new user
      await newUser.save();
      // Then, create a token
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY)
      // To hide the password
      const {password, ...rest} = newUser._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true}).json(rest);
    };
  } catch (error) {
    next(error);
  }
};