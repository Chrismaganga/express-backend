import { Request, Response } from 'express';
import Product from '../models/product';

export const getAllProducts = (req: Request, res: Response): void => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;

    Product.find()
        .select(['-_id'])
        .limit(limit)
        .sort({ id: sort })
        .then((products) => {
            res.json(products);
        })
        .catch((err) => console.log(err));
};

export const getProduct = (req: Request, res: Response): void => {
    const id = req.params.id;

    Product.findOne({ id })
        .select(['-_id'])
        .then((product) => {
            res.json(product);
        })
        .catch((err) => console.log(err));
};

export const getProductCategories = (req: Request, res: Response): void => {
    Product.distinct('category')
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => console.log(err));
};

export const getProductsInCategory = (req: Request, res: Response): void => {
    const category = req.params.category;
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;

    Product.find({ category })
        .select(['-_id'])
        .limit(limit)
        .sort({ id: sort })
        .then((products) => {
            res.json(products);
        })
        .catch((err) => console.log(err));
};

export const addProduct = (req: Request, res: Response): void => {
    if (typeof req.body === 'undefined') {
        res.json({
            status: 'error',
            message: 'data is undefined',
        });
    } else {
        const product = {
            id: 21,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
        };
        res.json(product);
    }
};

export const editProduct = (req: Request, res: Response): void => {
    if (typeof req.body === 'undefined' || req.params.id == null) {
        res.json({
            status: 'error',
            message: 'something went wrong! check your sent data',
        });
    } else {
        res.json({
            id: parseInt(req.params.id),
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
        });
    }
};

export const deleteProduct = (req: Request, res: Response): void => {
    if (req.params.id == null) {
        res.json({
            status: 'error',
            message: 'cart id should be provided',
        });
    } else {
        Product.findOne({ id: req.params.id })
            .select(['-_id'])
            .then((product) => {
                res.json(product);
            })
            .catch((err) => console.log(err));
    }
};
