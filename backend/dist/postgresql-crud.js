"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env
// Initialize Express
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON bodies
// Initialize Sequelize (PostgreSQL Connection)
const sequelizeOptions = {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql", // Ensure you're using the correct dialect (mysql, postgres, etc.)
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
const sequelize = new sequelize_1.Sequelize(sequelizeOptions);
// Define a Model in TypeScript
class User extends sequelize_1.Model {
}
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
}, { sequelize, tableName: "users" });
// Ensure database sync
sequelize.sync({ force: true }).then(() => console.log("Database synced."));
// CRUD Routes
// Create User
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            // Handle unexpected errors
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
// Read Users
app.get("/users", async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
});
// Read Single User
app.get("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user)
        return res.status(404).json({ error: "User not found" });
    res.json(user);
});
// Update User
app.put("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user)
        return res.status(404).json({ error: "User not found" });
    await user.update(req.body);
    res.json(user);
});
// Delete User
app.delete("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user)
        return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.status(204).send();
});
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
