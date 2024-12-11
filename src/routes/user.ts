import { Router } from 'express'
import * as user from '../controllers/user'

const router = Router();

router.get('/',user.getAllUser)
router.get('/:id',user.getUser)
router.post('/',user.addUser)
router.put('/:id',user.editUser)
router.patch('/:id',user.editUser)
router.delete('/:id',user.deleteUser)

export default router;