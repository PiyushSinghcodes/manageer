import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../db";

// Define the interface for task attributes
interface TaskAttributes {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
}

// Define the interface for creating a task (for optional fields like `id`)
interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

// Define the Task model class
class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public priority!: string;
  public status!: string;
}

// Initialize the model
Task.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("todo", "completed"),
      allowNull: false,
    },
  },
  {
    sequelize, // the Sequelize instance
    tableName: "tasks",
    timestamps: true, // Optional, whether to use timestamps
  }
);

export default Task;
