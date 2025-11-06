# TypeORM Setup Node.js

This project demonstrates a basic setup of a Node.js application using Express and TypeORM with a MySQL database. It includes examples of connecting to the database, defining an entity, and creating basic API endpoints for user management.

## Features

*   **Node.js & Express:** A fast, unopinionated, minimalist web framework for Node.js.
*   **TypeORM:** An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
*   **MySQL:** A popular open-source relational database management system.
*   **TypeScript:** Superset of JavaScript that adds static types.
*   **Nodemon:** Utility that monitors for any changes in your source and automatically restarts your server.

## Project Structure

```
.
├── backend/
│   ├── entities/
│   │   └── user.ts         # TypeORM User entity definition
│   ├── index.ts            # Main application file, database connection, and API routes
│   └── server.ts           # Express server setup
├── nodemon.json            # Nodemon configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project README file
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (v20 or higher recommended)
*   npm (comes with Node.js)
*   MySQL Server running (e.g., via Docker, XAMPP, or a direct installation)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gift56/typeorm-setup-nodejs.git
    cd typeorm-setup-nodejs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Database Setup

This project expects a MySQL database named `TypeOrmDB` with a user `root` and password `password` accessible on `localhost:3001`. You can modify these settings in `backend/index.ts`.

**Note:** The `synchronize` option in `AppDataSource` is set to `false`. This means TypeORM will not automatically create or update your database schema. You will need to manually create the `users` table or use TypeORM migrations for production environments. For development, you can temporarily set `synchronize: true` to let TypeORM create the table, but remember to revert it for production.

Example SQL for `users` table (if `synchronize` is `false`):

```sql
CREATE DATABASE TypeOrmDB;

USE TypeOrmDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### Running the Application

1.  **Build the TypeScript code:**
    ```bash
    npm run build
    ```

2.  **Start the server in development mode (with nodemon):**
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:3001`.

3.  **Start the server in production mode:**
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3001`.

## API Endpoints

The application exposes the following API endpoints:

*   **`GET /`**:
    *   Returns: `Server is running just fine!`
*   **`GET /users`**:
    *   Returns: A JSON array of all users in the database.
*   **`POST /users`**:
    *   Creates a new user.
    *   **Request Body (JSON):**
        ```json
        {
            "firstName": "John",
            "lastName": "Doe",
            "userName": "john.doe",
            "password": "securepassword"
        }
        ```
    *   Returns: `201 Created Successful` with the new user object, or `400 Bad Request` if fields are missing, or `500 Internal Server Error` on failure.

## Technologies Used

*   [Node.js](https://nodejs.org/)
*   [Express.js](https://expressjs.com/)
*   [TypeORM](https://typeorm.io/)
*   [MySQL](https://www.mysql.com/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Nodemon](https://nodemon.io/)

## License

This project is licensed under the ISC License.
