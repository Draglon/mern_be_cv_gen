import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import getError from '../utils/getError.js';
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
      return res.status(400).json({
        message: 'Invalid email or password.',
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    getError(res, 200, { message: 'The user has logged in successfully.', ...userData, token });
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
    const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });

    getError(res, 200, { message: 'User created successfully', ...user, token });
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error. Failed to register.', error });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return getError(res, 404, { message: 'User not found.' });
    }

    const { passwordHash, ...userData } = user._doc;

    getError(res, 200, { message: 'User data received successfully.', ...userData });
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error.', error });
  }
}
