import express from "express";
import mongoose from "mongoose";
// import multer from "multer";
import cors from 'cors';

import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { registerValidation, loginValidation } from "./validations/userValidations.js";
import {
  personalInfoValidation,
  personalHobbiesValidation,
  personalLanguagesValidation,
  personalExperienceValidation,
  personalEducationValidation,
  personalCoursesValidation,
  personalSkillsValidation,
} from "./validations/personalValidations.js";
import {
  UserController,
  PersonalInfoController,
  PersonalHobbiesController,
  PersonalLanguagesController,
  PersonalExperienceController,
  PersonalEducationController,
  PersonalCoursesController,
  PersonalSkillsController,
} from "./controllers/index.js";

// Подключение к базе данных
mongoose
  .connect('mongodb+srv://admin:draglon750@cluster0.znj5tnf.mongodb.net/FreeResume?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => { console.log('DB ok') })
  .catch((err) => { console.log('DB error', err) });

const app = express(); // запуск Express
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname); 
//   }
// })

// const upload = multer({ storage });

app.use(express.json()); // читать JSON в запросах
app.use(cors());
app.use('/uploads', express.static('uploads'));

// POST запрос login
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
// POST запрос registration
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
// GET запрос на получение информации о пользователе
app.get('/auth/user', checkAuth, UserController.getMe)

// Personal info
app.post('/personal_info', checkAuth, personalInfoValidation, handleValidationErrors, PersonalInfoController.create)
app.get('/personal_info/:id', checkAuth, PersonalInfoController.fetch)
app.patch('/personal_info/:id', checkAuth, personalInfoValidation, handleValidationErrors, PersonalInfoController.update)
// Personal hobbies
app.post('/personal_hobbies', checkAuth, personalHobbiesValidation, handleValidationErrors, PersonalHobbiesController.create)
app.get('/personal_hobbies/:id', checkAuth, PersonalHobbiesController.fetch)
app.patch('/personal_hobbies/:id', checkAuth, personalHobbiesValidation, handleValidationErrors, PersonalHobbiesController.update)
// Personal languages
app.post('/personal_languages', checkAuth, personalLanguagesValidation, handleValidationErrors, PersonalLanguagesController.create)
app.get('/personal_languages/:id', checkAuth, PersonalLanguagesController.fetch)
app.patch('/personal_languages/:id', checkAuth, personalLanguagesValidation, handleValidationErrors, PersonalLanguagesController.update)
// Personal experience
app.post('/personal_experience', checkAuth, personalExperienceValidation, handleValidationErrors, PersonalExperienceController.create)
app.get('/personal_experience/:id', checkAuth, PersonalExperienceController.fetch)
app.patch('/personal_experience/:id', checkAuth, personalExperienceValidation, handleValidationErrors, PersonalExperienceController.update)
// Personal education
app.post('/personal_education', checkAuth, personalEducationValidation, handleValidationErrors, PersonalEducationController.create)
app.get('/personal_education/:id', checkAuth, PersonalEducationController.fetch)
app.patch('/personal_education/:id', checkAuth, personalEducationValidation, handleValidationErrors, PersonalEducationController.update)
// Personal courses
app.post('/personal_courses', checkAuth, personalCoursesValidation, handleValidationErrors, PersonalCoursesController.create)
app.get('/personal_courses/:id', checkAuth, PersonalCoursesController.fetch)
app.patch('/personal_courses/:id', checkAuth, personalCoursesValidation, handleValidationErrors, PersonalCoursesController.update)
// Personal skills
app.post('/personal_skills', checkAuth, personalSkillsValidation, handleValidationErrors, PersonalSkillsController.create)
app.get('/personal_skills/:id', checkAuth, PersonalSkillsController.fetch)
app.patch('/personal_skills/:id', checkAuth, personalSkillsValidation, handleValidationErrors, PersonalSkillsController.update)

// POST загрузка изображения
// app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
//   res.json({
//     url: `/uploads/${req.file.originalname}`
//   })
// });

// Запуск сервера
app.listen(4000, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Server OK')
});
