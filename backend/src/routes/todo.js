import express from 'express';
import { addTodo, getTodos, addTemplate, getTemplates, applyTemplate } from '../controllers/todo.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, addTodo);
router.get('/', auth, getTodos);
router.post('/template', auth, addTemplate);
router.get('/template', auth, getTemplates);
router.post('/apply-template/:id', auth, applyTemplate);

export default router;
