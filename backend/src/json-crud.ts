import express, { Request, Response } from "express";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Interface for the Task model
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Initialize Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
const DATA_FILE = path.join(__dirname, "data.json"); // Path to the data file

// Helper function to read tasks from the data file
async function getTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8"); // Read the file asynchronously
    return JSON.parse(data); // Parse and return the tasks as an array
  } catch (error) {
    // If the file doesn't exist or another error occurs, return an empty array
    return [];
  }
}

// Helper function to save tasks to the data file
async function saveTasks(tasks: Task[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2)); // Write tasks as JSON
}

// CRUD: Create a new task (POST /tasks)
app.post("/tasks", async (req: Request, res: Response) => {
  const tasks = await getTasks(); // Get all current tasks
  const task: Task = {
    id: uuidv4(), // Generate a unique ID for the new task
    title: req.body.title, // Task title comes from the request body
    completed: req.body.completed || false, // Default to false if not provided
  };
  tasks.push(task); // Add the new task to the list
  await saveTasks(tasks); // Save the updated tasks to the file
  res.status(201).json(task); // Respond with the newly created task
});

// CRUD: Read all tasks (GET /tasks)
app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await getTasks(); // Get all tasks
  res.json(tasks); // Return tasks as JSON
});

// CRUD: Read a single task by ID (GET /tasks/:id)
app.get("/tasks/:id", async (req: Request, res: Response) => {
  const tasks = await getTasks(); // Get all tasks
  const task = tasks.find((t) => t.id === req.params.id); // Find the task by ID
  if (task) {
    res.json(task); // If found, return the task
  } else {
    res.status(404).json({ message: "Task not found" }); // If not found, return 404
  }
});

// CRUD: Update a task by ID (PUT /tasks/:id)
app.put("/tasks/:id", async (req: Request, res: Response) => {
  const tasks = await getTasks(); // Get all tasks
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id); // Find the task index by ID
  if (taskIndex !== -1) {
    // If task is found
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body }; // Update the task with the new data
    await saveTasks(tasks); // Save the updated tasks to the file
    res.json(tasks[taskIndex]); // Return the updated task
  } else {
    res.status(404).json({ message: "Task not found" }); // If task not found, return 404
  }
});

// CRUD: Delete a task by ID (DELETE /tasks/:id)
app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const tasks = await getTasks(); // Get all tasks
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id); // Find the task index by ID
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1); // If found, remove the task from the array
    await saveTasks(tasks); // Save the updated tasks to the file
    res.status(204).send(); // Return a 204 No Content status (no body)
  } else {
    res.status(404).json({ message: "Task not found" }); // If task not found, return 404
  }
});

// Set the port for the server to listen on
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`); // Log when the server starts
});
