import express from 'express';
import { root } from '../controllers';

const router = express.Router();

router.get('/', root.get);

export default router;
