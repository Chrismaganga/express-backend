import { Request, Response } from 'express';
import User from '../models/user';

export const getAllUser = (req: Request, res: Response): void => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;

    User.find()
        .select(['-_id'])
        .limit(limit)
        .sort({ id: sort })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => console.log(err));
};

export const getUser = (req: Request, res: Response): void => {
    const id = req.params.id;

    User.findOne({ id })
        .select(['-_id'])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => console.log(err));
};

export const addUser = (req: Request, res: Response): void => {
    if (req.body === undefined) {
        res.json({
            status: 'error',
            message: 'data is undefined',
        });
    } else {
        User.countDocuments()
            .then((count) => {
                const user = new User({
                    id: count + 1,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    name: {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                    },
                    address: {
                        city: req.body.address.city,
                        street: req.body.address.street,
                        number: req.body.number,
                        zipcode: req.body.zipcode,
                        geolocation: {
                            lat: req.body.address.geolocation.lat,
                            long: req.body.address.geolocation.long,
                        },
                    },
                    phone: req.body.phone,
                });
            
                res.json(user);
            })
            .catch((err) => console.log(err));
    }
};

export const editUser = (req: Request, res: Response): void => {
    if (req.body === undefined || req.params.id == null) {
        res.json({
            status: 'error',
            message: 'something went wrong! check your sent data',
        });
    } else {
        res.json({
            id: parseInt(req.params.id),
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            name: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            },
            address: {
                city: req.body.address.city,
                street: req.body.address.street,
                number: req.body.number,
                zipcode: req.body.zipcode,
                geolocation: {
                    lat: req.body.address.geolocation.lat,
                    long: req.body.address.geolocation.long,
                },
            },
            phone: req.body.phone,
        });
    }
};

export const deleteUser = (req: Request, res: Response): void => {
    if (req.params.id == null) {
        res.json({
            status: 'error',
            message: 'cart id should be provided',
        });
    } else {
        User.findOne({ id: req.params.id })
            .select(['-_id'])
            .then((user) => {
                res.json(user);
            })
            .catch((err) => console.log(err));
    }
};
