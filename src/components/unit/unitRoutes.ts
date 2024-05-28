import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import {
  createUnit,
  getAllUnit,
  getUnitById,
  updateUnit,
  deleteUnit,
} from "./unitController";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// middleware de JWT para ver si estamos autenticados
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No Autorizado'});
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error en la autenticacion: ', err); 
      return res.status(403).json({ error: 'No tienes acceso' });
    }

    next();
  })
};

//router.post('/account', authenticateToken, createAccount);

router.post('/', createUnit);
router.get('/', getAllUnit);
router.get('/:id', getUnitById);
router.put('/:id', updateUnit);
router.delete('/:id', deleteUnit);

export default router;
