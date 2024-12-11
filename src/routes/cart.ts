import express from 'express';
import { Router } from 'express';
import * as cart from '../controllers/cart';


const router: Router = Router();

router.get('/',cart.getAllCarts)
router.get('/:id',cart.getSingleCart)
router.get('/user/:userid',cart.getCartsbyUserid)
router.post('/',cart.addCart)
router.put('/:id',cart.editCart)
router.patch('/:id',cart.editCart)
router.delete('/:id',cart.deleteCart)

export default router;