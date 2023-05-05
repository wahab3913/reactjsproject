import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(url);
    console.log(`DB Connected`);
  } catch (err) {
    console.log(`Error from db ${err}`);
  }
};

export default connectDB;
