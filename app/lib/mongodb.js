import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const dbURI =
      process.env.NODE_ENV === "development"
        ? process.env.MONGODB_URI_LOCAL
        : process.env.MONGODB_URI_CLOUD;

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    mongoose.connection.once("open", () => {
      console.log(`Connected to database: ${mongoose.connection.name}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongoDB;
