import { Router } from 'express';
const router = Router();
import "@babel/polyfill"

import { createUser, getUser, getUsers, deleteUser, updateUsers } from '../controllers/users.controller';


router.get('/getUsers', getUsers);
router.get('/getUser/:id', getUser);
router.post('/create', createUser);
router.delete('/removeUser/:id', deleteUser);
router.put('/updateUser', updateUsers);


export default router;