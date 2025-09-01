import Todo from '../models/Todo.js';
import Template from '../models/Template.js';

export const addTodo = async (req, res) => {
    try {
        const todo = await Todo.create({ ...req.body, user: req.user.id });
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const addTemplate = async (req, res) => {
    try {
        const template = await Template.create({ ...req.body, user: req.user.id });
        res.status(201).json(template);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getTemplates = async (req, res) => {
    try {
        const templates = await Template.find({ user: req.user.id });
        res.json(templates);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const applyTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (!template) return res.status(404).json({ msg: "Template not found" });

        const todos = await Todo.insertMany(
            template.tasks.map(task => ({ task, user: req.user.id }))
        );
        res.json(todos);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
