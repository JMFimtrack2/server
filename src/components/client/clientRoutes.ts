//import express, { Request, Response, NextFunction } from 'express';
//import jwt from 'jsonwebtoken';
//
//import {
//  createResidence, getAllResidence, getResidenceById, updateResidence, deleteResidence
//} from "../controllers/clientController";
//
//
//const router = express.Router();
//const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
//
//// middleware de JWT para ver si estamos autenticados
//const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//  const authHeader = req.headers['authorization'];
//  const token = authHeader && authHeader.split(' ')[1];
//  if (!token) {
//    return res.status(401).json({ error: 'No Autorizado'});
//  }
//
//  jwt.verify(token, JWT_SECRET, (err, decoded) => {
//    if (err) {
//      console.error('Error en la autenticacion: ', err); 
//      return res.status(403).json({ error: 'No tienes acceso' });
//    }
//
//    next();
//  })
//};
//
////router.post('/account', authenticateToken, createAccount);
//
//router.post('/residence', createResidence);
//router.get('/residence', getAllResidence);
//router.get('/residence/:id', getResidenceById);
//router.put('/residence/:id', updateResidence);
//router.delete('/residence/:id', deleteResidence);
//
//export default router;
