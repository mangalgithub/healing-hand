import mongoose from "mongoose";

// main().catch(err => console.log(err));

const connectdb=async function main() {
//  const db= await mongoose.connect('mongodb://127.0.0.1:27017/register');
  const db = await mongoose.connect(
    "mongodb://localhost:27017/register",
    );
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log(`db connected ${db.connection.host}`);
}
export default connectdb;
