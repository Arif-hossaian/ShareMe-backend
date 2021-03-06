import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("database not connected", error);
  }
  const connection = mongoose.connection;
  if (connection.readyState >= 1) {
    console.log("Connect to Database");
    return;
  }
  connection.on("Error", () => console.log("Connection failed"));
};

export default connectDB;
