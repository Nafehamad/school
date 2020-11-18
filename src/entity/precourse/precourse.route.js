import passport from 'passport';
import { Router } from 'express';
import config from '../../config/config';
import { allowOnly } from '../../services/checkPermision';
import { addPreCourse, deletePreCourse } from './precourse.controller';


const router = Router();
router.post('/precourse', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, addPreCourse));

router.delete('/precourse/:id', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, deletePreCourse));

export default router;