import express, { Request, Response } from "express";
import { Sequelize, Options, DataTypes, Model } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Initialize Express
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Initialize Sequelize (PostgreSQL Connection)
const sequelizeOptions: Options = {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql", // Ensure you're using the correct dialect (mysql, postgres, etc.)
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const sequelize = new Sequelize(sequelizeOptions);

// Define a Model in TypeScript
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, tableName: "users" }
);

// Ensure database sync
sequelize.sync({ force: true }).then(() => console.log("Database synced."));

// CRUD Routes

// Create User
app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // Handle unexpected errors
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

// Read Users
app.get("/users", async (_req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
});

// Read Single User
app.get("/users/:id", async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Update User
app.put("/users/:id", async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await user.update(req.body);
  res.json(user);
});

// Delete User
app.delete("/users/:id", async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await user.destroy();
  res.status(204).send();
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));