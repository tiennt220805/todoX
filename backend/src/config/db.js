import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Connect database successfully!");
  } catch (error) {
    console.error("Fail to connect database");
    process.exit(1); // Exit with error
  }
};
