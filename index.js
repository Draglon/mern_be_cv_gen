import express from "express";
import mongoose from "mongoose";
// import multer from "multer";
// import bodyParser from "body-parser";
import cors from 'cors';

import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  userValidations,
  profileValidations,
  settingsValidations,
} from "./validations/index.js";
import {
  personalInfoValidations,
  personalHobbiesValidations,
  personalLanguagesValidations,
  personalExperienceValidations,
  personalEducationValidations,
  personalCoursesValidations,
  personalSkillsValidations,
  personalToolsValidations,
} from "./validations/personal/index.js";

import {
  UserController,
  SettingsController,
  ResumeController,
  PersonalInfoController,
  PersonalHobbiesController,
  PersonalLanguagesController,
  PersonalExperienceController,
  PersonalEducationController,
  PersonalCoursesController,
  PersonalSkillsController,
  PersonalToolsController,
} from "./controllers/index.js";

// Connecting to a database
mongoose
  .connect("mongodb+srv://admin:draglon750@cluster0.znj5tnf.mongodb.net/FreeResume?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => { console.log('DB ok') })
  .catch((err) => { console.log('DB error', err) });

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => { console.log('DB ok') })
//   .catch((err) => { console.log('DB error', err) });

const app = express();
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     cb(null, 'uploads/avatars');
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname); 
//   }
// })

// const upload = multer({ storage: storage, limits: { fileSize: 100000000 }});s

// app.use(bodyParser.json({limit: "100mb", parameterLimit: 100000000}));
// app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 100000000}));

app.use(express.json()); // reads JSON requests
app.use(cors());
// app.use('/uploads/avatars', express.static('uploads/avatars'));

// upload avatar
// app.post('/upload_avatar', checkAuth, upload.single('image'), (req, res) => {
//   res.json({
//     url: `/uploads/avatars/${req.file.originalname}`
//   })
// });

// login
app.post('/auth/login', userValidations.loginValidation, handleValidationErrors, UserController.login);
// registration
app.post('/auth/register', userValidations.registerValidation, handleValidationErrors, UserController.register);
// general information by user
app.get('/auth/user', checkAuth, UserController.fetchUser);
// profile
app.patch('/users/:userId', checkAuth, profileValidations.profileValidation, handleValidationErrors, UserController.updateUser);
// settings - delete account
app.delete('/users/:userId', checkAuth, settingsValidations.deleteAccountValidation, handleValidationErrors, SettingsController.deleteAccount);
app.patch('/users/:userId/email', checkAuth, settingsValidations.changeEmailValidation, handleValidationErrors, SettingsController.updateUserEmail);
app.patch('/users/:userId/password', checkAuth, settingsValidations.changePasswordValidation, handleValidationErrors, SettingsController.updateUserPassword);

// Resume
app.get('/resume/:userId', checkAuth, ResumeController.fetch);

// Personal info
app.post('/personal_info', checkAuth, personalInfoValidations.personalInfoValidation, handleValidationErrors, PersonalInfoController.create);
app.get('/personal_info/:id', checkAuth, PersonalInfoController.fetch);
app.patch('/personal_info/:id', checkAuth, personalInfoValidations.personalInfoValidation, handleValidationErrors, PersonalInfoController.update);
// Personal hobbies
app.post('/personal_hobbies', checkAuth, personalHobbiesValidations.personalHobbiesValidation, handleValidationErrors, PersonalHobbiesController.create);
app.get('/personal_hobbies/:id', checkAuth, PersonalHobbiesController.fetch);
app.patch('/personal_hobbies/:id', checkAuth, personalHobbiesValidations.personalHobbiesValidation, handleValidationErrors, PersonalHobbiesController.update);
// Personal languages
app.post('/personal_languages', checkAuth, personalLanguagesValidations.personalLanguagesValidation, handleValidationErrors, PersonalLanguagesController.create);
app.get('/personal_languages/:id', checkAuth, PersonalLanguagesController.fetch);
app.patch('/personal_languages/:id', checkAuth, personalLanguagesValidations.personalLanguagesValidation, handleValidationErrors, PersonalLanguagesController.update);
// Personal experience
app.post('/personal_experience', checkAuth, personalExperienceValidations.personalExperienceValidation, handleValidationErrors, PersonalExperienceController.create);
app.get('/personal_experience/:id', checkAuth, PersonalExperienceController.fetch);
app.patch('/personal_experience/:id', checkAuth, personalExperienceValidations.personalExperienceValidation, handleValidationErrors, PersonalExperienceController.update);
// Personal education
app.post('/personal_education', checkAuth, personalEducationValidations.personalEducationValidation, handleValidationErrors, PersonalEducationController.create);
app.get('/personal_education/:id', checkAuth, PersonalEducationController.fetch);
app.patch('/personal_education/:id', checkAuth, personalEducationValidations.personalEducationValidation, handleValidationErrors, PersonalEducationController.update);
// Personal courses
app.post('/personal_courses', checkAuth, personalCoursesValidations.personalCoursesValidation, handleValidationErrors, PersonalCoursesController.create);
app.get('/personal_courses/:id', checkAuth, PersonalCoursesController.fetch);
app.patch('/personal_courses/:id', checkAuth, personalCoursesValidations.personalCoursesValidation, handleValidationErrors, PersonalCoursesController.update);
// Personal skills
app.post('/personal_skills', checkAuth, personalSkillsValidations.personalSkillsValidation, handleValidationErrors, PersonalSkillsController.create);
app.get('/personal_skills/:id', checkAuth, PersonalSkillsController.fetch);
app.patch('/personal_skills/:id', checkAuth, personalSkillsValidations.personalSkillsValidation, handleValidationErrors, PersonalSkillsController.update);
// Personal tools
app.post('/personal_tools', checkAuth, personalToolsValidations.personalToolsValidation, handleValidationErrors, PersonalToolsController.create);
app.get('/personal_tools/:id', checkAuth, PersonalToolsController.fetch);
app.patch('/personal_tools/:id', checkAuth, personalToolsValidations.personalToolsValidation, handleValidationErrors, PersonalToolsController.update);

// Start server
app.listen(process.env.PORT || 4000, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Server OK')
});
