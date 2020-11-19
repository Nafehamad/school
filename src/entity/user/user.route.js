import passport from 'passport';
import { Router } from 'express';
import config from '../../config/config';
import { allowOnly } from '../../services/checkPermision';
import {
    getAllUsers, signUp, verifyEmail,
    login, getUser, deleteUser, logout, forget,
    signUpSemester, signUpCourse, updateProfile,
    resetPassword
} from './user.controller';


const router = Router();

router.post('/user', signUp);

router.get('/user', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, getAllUsers));

router.get('/user/:id', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, getUser));

router.delete('/user/:id', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, deleteUser));

router.put('/user/:name/:phone', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.student, updateProfile));

router.put('/user/:s_id', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.student, signUpSemester));

router.post('/verify', verifyEmail);

router.post('/login', login);

router.post('/forget', forget);

router.get('/logout', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.all, logout));

router.put('/reset', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.all, resetPassword));


export default router;