import mongoose from "mongoose";

// main().catch(err => console.log(err));

const connectdb = async function main() {
  const db = await mongoose.connect(process.env.MONGO_URI);
  console.log(`db connected ${db.connection.host}`);
};
export default connectdb;
