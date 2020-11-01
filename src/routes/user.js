import { Router } from 'express';
import passport from 'passport';
import config from '../config/config';
import { allowOnly } from '../services/checkPermision';
const router = Router();
import "@babel/polyfill"


import { 
  signUp,
  login,
  findAll,
  findById,
  deleteUser,
  createSemester,
  updateSemester,
  signUpSemester } from '../controllers/users.controller';


router.post('/signUp', passport.authenticate('jwt', { session: false }),// use jwt as strategy
    allowOnly(config.accessLevels.manager,signUp )
  );
  router.get('/getUsers', passport.authenticate('jwt', { session: false  }),
    allowOnly(config.accessLevels.manager, findAll)
  );
  router.get('/getUser/:id', passport.authenticate('jwt', { session: false  }),
  allowOnly(config.accessLevels.manager, findById)
 );
 router.delete('/deleteUser/:id', passport.authenticate('jwt', { session: false  }),
  allowOnly(config.accessLevels.manager, deleteUser)
 );
router.post('/create', signUp);
router.post('/login', login);
router.post('/createSemester',createSemester)
router.put('/updateSemester/:s_id',updateSemester)
router.put('/signUpSemester', passport.authenticate('jwt', { session: false }),// use jwt as strategy
    allowOnly(config.accessLevels.student,signUpSemester )
  );
export default router;