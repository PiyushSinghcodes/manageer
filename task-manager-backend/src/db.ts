import { Sequelize } from "sequelize";

// Replace with your actual MySQL username, password, and database name
const sequelize = new Sequelize("task_manager", "root", "Meganikx@0", {
  host: "localhost", // Change if your database is hosted elsewhere
  dialect: "mysql", // Use MySQL as the dialect
  logging: false, // Disable logging (optional)
  pool: {
    max: 5, // Max number of connections
    min: 0, // Min number of connections
    acquire: 30000, // Max time in ms to get a connection before throwing an error
    idle: 10000, // Max idle time before a connection is closed
  },
});

export default sequelize;
