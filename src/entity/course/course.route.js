import passport from 'passport';

import { Router } from 'express';
import config from '../../config/config';

import { allowOnly } from '../../services/checkPermision';
import { addCourse, getCourses, deleteCourse } from './course.controller';

const router = Router();


router.post('/course', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, addCourse));

router.get('/course', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, getCourses));

router.post('/course/:id', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, deleteCourse));

export default router;