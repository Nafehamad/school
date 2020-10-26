import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

import { createRole, getRole, getRoles, deleteRole, updateRoles } from '../controllers/roles.controller';


router.get('/getRole/:id',getRole);
router.get('/getRoles', getRoles);
router.post('/create', createRole);
router.delete('/removeRole/:key', deleteRole);
router.put('/updateRole', updateRoles);


export default router;