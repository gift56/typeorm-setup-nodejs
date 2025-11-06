import { User } from "./entities/user.js";
import app from "./server.js";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3001,
  username: "root",
  password: "password",
  database: "TypeOrmDB",
  entities: [User],
  synchronize: false,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((error) => console.log(error));

app.get("/users", async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const allUsers = await userRepository.find();
    console.log("🚀 ~ allUsers:", allUsers);
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const firstName = "John";
    const lastName = "Magure";
    const userName = "johnmagure";
    const password = "password11";

    if (!firstName || !lastName || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = userRepository.create({
      firstName,
      lastName,
      userName,
      password,
    });

    await userRepository.save(newUser);
    console.log("User saved successfully:", newUser);
    res.status(201).json({
      message: "Created Successful",
      user: newUser,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user" });
  }
});
