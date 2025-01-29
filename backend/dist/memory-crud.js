"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importing Express and Types for Request/Response
const uuid_1 = require("uuid"); // Importing uuid to generate unique task IDs
const app = (0, express_1.default)(); // Initializing the Express app
app.use(express_1.default.json()); // Middleware to parse JSON bodies in requests
// In-memory array to store tasks
let tasks = [];
// CREATE - Endpoint to create a new task
app.post("/tasks", (req, res) => {
    // Destructuring the title and completed status from the request body
    const task = {
        id: (0, uuid_1.v4)(), // Generating a unique ID for the task using uuid
        title: req.body.title, // The title is provided in the request body
        completed: req.body.completed || false, // If completed is not provided, set it to false
    };
    // Adding the new task to the tasks array
    tasks.push(task);
    // Responding with the newly created task and status code 201 (Created)
    res.status(201).json(task);
});
// READ ALL - Endpoint to get a list of all tasks
app.get("/tasks", (req, res) => {
    // Responding with the tasks array (list of all tasks)
    res.json(tasks);
});
// READ ONE - Endpoint to get a single task by its ID
app.get("/tasks/:id", (req, res) => {
    // Searching for the task with the given ID
    const task = tasks.find((t) => t.id === req.params.id);
    // If the task is not found, respond with 404 (Not Found)
    if (!task)
        return res.status(404).send("Task not found");
    // Responding with the task details
    res.json(task);
});
// UPDATE - Endpoint to update an existing task by its ID
app.put("/tasks/:id", (req, res) => {
    // Finding the index of the task to update
    const index = tasks.findIndex((t) => t.id === req.params.id);
    // If the task is not found, respond with 404 (Not Found)
    if (index === -1)
        return res.status(404).send("Task not found");
    // Updating the task with the new data provided in the request body
    tasks[index] = Object.assign(Object.assign({}, tasks[index]), req.body);
    // Responding with the updated task
    res.json(tasks[index]);
});
// DELETE - Endpoint to delete a task by its ID
app.delete("/tasks/:id", (req, res) => {
    // Removing the task from the array by filtering out the task with the given ID
    tasks = tasks.filter((t) => t.id !== req.params.id);
    // Responding with status 204 (No Content), indicating the task was successfully deleted
    res.status(204).send();
});
// Defining the port the server will listen on
const PORT = 3000;
// Starting the server and listening for requests
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
