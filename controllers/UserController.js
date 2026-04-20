import bcrypt from "bcrypt";

import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';
import getToken from '../utils/getToken.js';
import checkEmailExists from '../utils/checkEmailExists.js';
import UserModel from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return getError(res, 404, { message: 'User not found.' });
    }

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = getToken(user._id);
    const { passwordHash, ...userData } = user._doc;

    getResponse(res, 200, { ...userData, token });
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error. Failed to log in.', error });
  }
}

export const register = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    if (await checkEmailExists(email)) {
      return getError(res, 401, { message: 'Email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
  
    const doc = new UserModel({
      email,
      userName,
      passwordHash,
    })

    const user = await doc.save();
    const token = getToken(user._id);

    getResponse(res, 200, { ...user, token });
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error. Failed to register.', error });
  }
}

export const fetchUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return getError(res, 404, { message: 'User not found.' });
    }

    const { passwordHash, ...userData } = user._doc;

    getResponse(res, 200, { ...userData });
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error.', error });
  }
}
