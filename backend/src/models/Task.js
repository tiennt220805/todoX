import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true, // Nếu title có nhiều hơn 1 space giữa các từ thì tự động xóa
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createAt và updateAt được tạo tự động
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
