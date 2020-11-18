import passport from 'passport';
import { Router } from 'express';
import config from '../../config/config';
import { allowOnly } from '../../services/checkPermision';
import {setGrade,getGrades,deleteGrade} from './grade.controller';

const router = Router();

router.post('/grade', passport.authenticate('jwt', { session: false  }),
    allowOnly(config.accessLevels.teacher, setGrade));

router.get('/grade', passport.authenticate('jwt', { session: false  }),
    allowOnly(config.accessLevels.teacher, getGrades));

router.post('/grade/:id', passport.authenticate('jwt', { session: false  }),
    allowOnly(config.accessLevels.teacher, deleteGrade));   

export default router;