import express, { Request, Response } from "express"; // Importing Express and Types for Request/Response
import { v4 as uuidv4 } from "uuid"; // Importing uuid to generate unique task IDs

// Defining a TypeScript interface for the Task object
interface Task {
  id: string; // Unique identifier for the task
  title: string; // Title of the task
  completed: boolean; // Status of the task (completed or not)
}

const app = express(); // Initializing the Express app
app.use(express.json()); // Middleware to parse JSON bodies in requests

// In-memory array to store tasks
let tasks: Task[] = [];

// CREATE - Endpoint to create a new task
app.post("/tasks", (req: Request, res: Response) => {
  // Destructuring the title and completed status from the request body
  const task: Task = {
    id: uuidv4(), // Generating a unique ID for the task using uuid
    title: req.body.title, // The title is provided in the request body
    completed: req.body.completed || false, // If completed is not provided, set it to false
  };

  // Adding the new task to the tasks array
  tasks.push(task);

  // Responding with the newly created task and status code 201 (Created)
  res.status(201).json(task);
});

// READ ALL - Endpoint to get a list of all tasks
app.get("/tasks", (req: Request, res: Response) => {
  // Responding with the tasks array (list of all tasks)
  res.json(tasks);
});

// READ ONE - Endpoint to get a single task by its ID
app.get("/tasks/:id", (req: Request, res: Response) => {
  // Searching for the task with the given ID
  const task = tasks.find((t) => t.id === req.params.id);

  // If the task is not found, respond with 404 (Not Found)
  if (!task) return res.status(404).send("Task not found");

  // Responding with the task details
  res.json(task);
});

// UPDATE - Endpoint to update an existing task by its ID
app.put("/tasks/:id", (req: Request, res: Response) => {
  // Finding the index of the task to update
  const index = tasks.findIndex((t) => t.id === req.params.id);

  // If the task is not found, respond with 404 (Not Found)
  if (index === -1) return res.status(404).send("Task not found");

  // Updating the task with the new data provided in the request body
  tasks[index] = { ...tasks[index], ...req.body };

  // Responding with the updated task
  res.json(tasks[index]);
});

// DELETE - Endpoint to delete a task by its ID
app.delete("/tasks/:id", (req: Request, res: Response) => {
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