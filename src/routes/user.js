import { Router } from 'express';
import passport from 'passport';
import config from '../config/config';
import { allowOnly } from '../services/checkPermision';
const router = Router();
import "@babel/polyfill"


import { 
  signUp,login,
  findAll,findById,
  deleteUser,createSemester,
  updateSemester,signUpSemester,
  addCourse,addPreCourse,
  getCourses,signUpCourse,
  setGrade,setStudentGrade,
  getStudentCourse,resetPassword,
  updateProfile,logout,forget,verifyEmail
 } from '../controllers/users.controller';


router.post('/signup', signUp);

router.post('/login', login);

router.get('/getUsers', passport.authenticate('jwt', { session: false  }),
    allowOnly(config.accessLevels.manager, findAll));

router.get('/getUser/:id', passport.authenticate('jwt', { session: false  }),
    allowOnly(config.accessLevels.manager, findById));

router.delete('/deleteUser/:id', passport.authenticate('jwt', { session: false  }),
  allowOnly(config.accessLevels.manager, deleteUser));

router.post('/createSemester',passport.authenticate('jwt', { session: false }),
allowOnly(config.accessLevels.manager,createSemester));

router.put('/updateSemester/:s_id',passport.authenticate('jwt', { session: false }),
allowOnly(config.accessLevels.manager,updateSemester ));

router.put('/signUpSemester', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.student,signUpSemester ));

router.post('/addCourse', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager,addCourse ));

router.post('/addPreCourse', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager,addPreCourse ));

router.get('/getCourses', passport.authenticate('jwt', { session: false  }),
  allowOnly(config.accessLevels.studentandmanager, getCourses)
);
router.post('/signUpCourse', passport.authenticate('jwt', { session: false  }),
  allowOnly(config.accessLevels.student, signUpCourse)
);
router.post('/setGrade', passport.authenticate('jwt', { session: false  }),
  allowOnly(config.accessLevels.teacher, setGrade)
);
router.put('/setUserGrade', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.teacher,setStudentGrade ));

router.get('/getStudentCourse', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.student,getStudentCourse ));

router.put('/resetPassword', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.student,resetPassword));

router.put('/updateProfile', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.student,updateProfile));

router.get('/logout',passport.authenticate('jwt', { session: false }),
allowOnly(config.accessLevels.all,logout ));

router.post('/forget', forget);

router.post('/verifyEmail',verifyEmail)
export default router;