import passport from 'passport';
import { Router } from 'express';
import config from '../../config/config';
import { allowOnly } from '../../services/checkPermision';
import { signUpCourse, getStudentCourse, setStudentGrade } from './usercourse.controller';

const router = Router();

router.post('/usercourse', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.student, signUpCourse));

router.put('/usercourse', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.teacher, setStudentGrade));

router.get('/usercourse', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.student, getStudentCourse));

export default router;