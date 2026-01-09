import express from 'express';
import { body } from 'express-validator';
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from '../controllers/task.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';

const router = express.Router();

router.route('/')
    .get(protect, getTasks)
    .post(
        protect,
        [
            body('title', 'Title is required').not().isEmpty(),
        ],
        validate,
        createTask
    );

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

export default router;
