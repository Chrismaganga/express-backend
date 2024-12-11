import { Request, Response } from 'express';
import Cart from '../models/cart';


export const getAllCarts = (req: Request, res: Response): void => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;
    const startDate = req.query.startdate ? new Date(req.query.startdate as string) : new Date('1970-1-1');
    const endDate = req.query.enddate ? new Date(req.query.enddate as string) : new Date();

    console.log(startDate, endDate);

    Cart.find({
        date: { $gte: startDate, $lt: endDate },
    })
        .select('-_id -products._id')
        .limit(limit)
        .sort({ id: sort })
        .then((carts) => {
            res.json(carts);
        })
        .catch((err) => console.log(err));
};

export const getCartsbyUserid = (req: Request, res: Response): void => {
    const userId = req.params.userid;
    const startDate = req.query.startdate ? new Date(req.query.startdate as string) : new Date('1970-1-1');
    const endDate = req.query.enddate ? new Date(req.query.enddate as string) : new Date();

    console.log(startDate, endDate);
    Cart.find({
        userId,
        date: { $gte: startDate, $lt: endDate },
    })
        .select('-_id -products._id')
        .then((carts) => {
            res.json(carts);
        })
        .catch((err) => console.log(err));
};

export const getSingleCart = (req: Request, res: Response): void => {
    const id = req.params.id;
    Cart.findOne({
        id,
    })
        .select('-_id -products._id')
        .then((cart) => res.json(cart))
        .catch((err) => console.log(err));
};

export const addCart = (req: Request, res: Response): void => {
    if (typeof req.body === 'undefined') {
        res.json({
            status: 'error',
            message: 'data is undefined',
        });
    } else {
        const cart = {
            id: 11,
            userId: req.body.userId,
            date: req.body.date,
            products: req.body.products,
        };
        res.json(cart);
    }
};

export const editCart = (req: Request, res: Response): void => {
    if (typeof req.body === 'undefined' || req.params.id == null) {
        res.json({
            status: 'error',
            message: 'something went wrong! check your sent data',
        });
    } else {
        res.json({
            id: parseInt(req.params.id),
            userId: req.body.userId,
            date: req.body.date,
            products: req.body.products,
        });
    }
};

export const deleteCart = (req: Request, res: Response): void => {
    if (req.params.id == null) {
        res.json({
            status: 'error',
            message: 'cart id should be provided',
        });
    } else {
        Cart.findOne({ id: req.params.id })
            .select('-_id -products._id')
            .then((cart) => {
                res.json(cart);
            })
            .catch((err) => console.log(err));
    }
};
