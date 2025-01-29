"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("sqlite::memory:"); // Using SQLite for simplicity
// Task model definition
class Task extends sequelize_1.Model {
}
// Initializing the Task model with the defined attributes
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: sequelize_1.DataTypes.STRING,
    completed: sequelize_1.DataTypes.BOOLEAN,
}, { sequelize, modelName: "task" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Sync database (creates tables on startup)
sequelize.sync({ force: true }); // force: true creates new tables on each start
// CREATE operation - Add a new task
app.post("/tasks", async (req, res) => {
    try {
        const task = await Task.create(req.body); // Creates a new task in the database
        res.status(201).json(task); // Returns the created task with status 201
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message }); // Returns error message on failure
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
// READ operation - Get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.findAll(); // Retrieves all tasks from the database
        res.json(tasks); // Sends tasks as JSON
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message }); // Internal server error
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
// READ operation - Get a task by its ID
app.get("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id); // Finds a task by primary key (ID)
        if (task) {
            res.json(task); // Sends the task if found
        }
        else {
            res.status(404).json({ error: "Task not found" }); // Task not found
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message }); // Internal server error
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
// UPDATE operation - Update a task by its ID
app.put("/tasks/:id", async (req, res) => {
    var _a, _b;
    try {
        const task = await Task.findByPk(req.params.id); // Finds the task by ID
        if (task) {
            task.title = (_a = req.body.title) !== null && _a !== void 0 ? _a : task.title; // Update title if provided
            task.completed = (_b = req.body.completed) !== null && _b !== void 0 ? _b : task.completed; // Update completed if provided
            await task.save(); // Save the updated task
            res.json(task); // Sends the updated task
        }
        else {
            res.status(404).json({ error: "Task not found" }); // Task not found
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message }); // Error in updating task
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
// DELETE operation - Delete a task by its ID
app.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id); // Finds the task by ID
        if (task) {
            await task.destroy(); // Deletes the task from the database
            res.status(204).send(); // Responds with a 204 status (No Content) after deletion
        }
        else {
            res.status(404).json({ error: "Task not found" }); // Task not found
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message }); // Internal server error
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
// Server setup
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
