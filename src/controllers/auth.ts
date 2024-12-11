import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response): void => {
    const { username, password } = req.body;
    if (username && password) {
        User.findOne({ username, password })
            .then((user: any) => {
                if (user) {
                    res.json({
                        token: jwt.sign({ user: username }, 'secret_key'),
                    });
                } else {
                    res.status(401).send('username or password is incorrect');
                }
            })
            .catch((err: any) => {
                console.error(err);
                res.status(500).send('Internal server error');
            });
    } else {
        res.status(400).send('Username and password are required');
    }
};
