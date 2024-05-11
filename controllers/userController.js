import bcrypt from "bcrypt";
import {generateToken} from "../utils/generateToken.js";
import User from '../models/userModel.js';

export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, password, email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send("User already exists");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });

    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("User not created");
    }
    const token = generateToken(email);
    // res.cookie("token", token)
    res.send("Signed Successfully!");
  } catch (error) {
    console.log(error, "Something Wrong");
    res.status(500).send("Internal Server Error");
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if(!matchPassword) {
        return res.send("Password incorrect")
    }

    const token = generateToken(email);
    res.cookie("token", token);
    res.send("Logged In!");

  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};

