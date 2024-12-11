import { Request, Response } from 'express';

export const indexPage = (req: Request, res: Response) => {
    res.send('Welcome to the E-commerce Backend!');
};

export const docsPage = (req: Request, res: Response) => {
    res.send('API Documentation will be here.');
};