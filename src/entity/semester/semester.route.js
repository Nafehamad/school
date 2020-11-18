import passport from 'passport';
import { Router } from 'express';
import config from '../../config/config';
import { allowOnly } from '../../services/checkPermision';
import { addSemester, getSemester, deleteSemester, updateSemester } from './semester.controller';


const router = Router();
router.post('/semester', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, addSemester));

router.put('/semester/:s-id', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, updateSemester));

router.get('/semester', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, getSemester));

router.delete('/semester/:id', passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.manager, deleteSemester));

export default router;