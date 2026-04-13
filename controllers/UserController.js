import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import getError from '../utils/getError.js';
import UserModel from "../models/User.js";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return getError(res, 404, { message: 'Пользователь не найден.' });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
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

    res.json({
      ...userData,
      token,
    })
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Не удалось авторизоваться', error });
  }
}

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
  
    const doc = new UserModel({
      email: req.body.email,
      userName: req.body.userName,
      passwordHash,
    })

    const user = await doc.save();
    const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });

    res.json({ ...user, token });
  }
  catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Не удалось зарегистрироваться', error });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return getError(res, 404, { message: 'Пользователь не найден.' });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (error) {
    console.log(error);
    getError(res, 500, { message: 'Нет доступа', error });
  }
}
