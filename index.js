import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import bodyParser from "body-parser";
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
  personalToolsValidation,
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
  PersonalToolsController,
} from "./controllers/index.js";

// Connecting to a database
// 'mongodb+srv://admin:draglon750@cluster0.znj5tnf.mongodb.net/FreeResume?retryWrites=true&w=majority&appName=Cluster0'
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => { console.log('DB ok') })
  .catch((err) => { console.log('DB error', err) });

const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/avatars');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname); 
  }
})

const upload = multer({ storage: storage, limits: { fileSize: 100000000 }});

app.use(bodyParser.json({limit: "100mb", parameterLimit: 100000000}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 100000000}));

app.use(express.json()); // reads JSON requests
app.use(cors());
app.use('/uploads/avatars', express.static('uploads/avatars'));

// login
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
// registration
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
// general information by user
app.get('/auth/user', checkAuth, UserController.getMe)
// upload avatar
app.post('/upload_avatar', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/avatars/${req.file.originalname}`
  })
});

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
// Personal tools
app.post('/personal_tools', checkAuth, personalToolsValidation, handleValidationErrors, PersonalToolsController.create)
app.get('/personal_tools/:id', checkAuth, PersonalToolsController.fetch)
app.patch('/personal_tools/:id', checkAuth, personalToolsValidation, handleValidationErrors, PersonalToolsController.update)

// Start server
app.listen(process.env.PORT || 4000, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Server OK')
});
