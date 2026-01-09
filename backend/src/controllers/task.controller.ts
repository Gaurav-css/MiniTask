import { Request, Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/auth.middleware';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const { search, status } = req.query;
        const query: any = { user: req.user?._id };

        if (status && status !== 'all') {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req: AuthRequest, res: Response) => {
    const { title, description } = req.body;

    try {
        const task = new Task({
            title,
            description,
            user: req.user?._id,
            status: 'pending',
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task) {
            if (task.user.toString() !== req.user?._id.toString()) {
                res.status(401).json({ message: 'User not authorized' });
                return;
            }

            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.status = req.body.status || task.status;

            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task) {
            if (task.user.toString() !== req.user?._id.toString()) {
                res.status(401).json({ message: 'User not authorized' });
                return;
            }

            await task.deleteOne();
            res.json({ message: 'Task removed' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
