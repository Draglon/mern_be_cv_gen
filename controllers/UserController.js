import bcrypt from "bcrypt";

import getError from '../utils/getError.js';
import getResponse from '../utils/getResponse.js';
import getToken from '../utils/getToken.js';
import checkEmailExists from '../utils/checkEmailExists.js';
import checkPassword from '../utils/checkPassword.js';
import UserModel from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return getError(res, 404, { message: 'User not found!' });
    }

    const isPasswordMatch = await checkPassword(password, user.passwordHash);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password!' })
    }

    const token = getToken(user._id);
    const { passwordHash, ...userData } = user._doc;

    getResponse(res, 200, { ...userData, token });
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Server error! Failed to log in!', error });
  }
}

export const register = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    if (await checkEmailExists(email)) {
      return getError(res, 401, { message: 'Email already exists!' });
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
    getError(res, 500, { message: 'Server error! Failed to register!', error });
  }
}

export const fetchUser = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.userId).select("-passwordHash");

    if (!userData) {
      return getError(res, 404, { message: "User not found!" });
    }

    return getResponse(res, 200, userData);
  } catch (error) {
    console.log(error);
    return getError(res, 500, {
      message: "Server error!",
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { avatarUrl, firstName, lastName, userName } = req.body;
    const { userId } = req;

    const user = await UserModel.findById(userId);

    if (!user) {
      return getError(res, 404, { message: "User not found!" });
    }

    const updateData = {};

    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (userName !== undefined) updateData.userName = userName;

    await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json(updateData);
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: "Server error!", error });
  }
};
