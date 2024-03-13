import mongoose from "mongoose";

// main().catch(err => console.log(err));

const connectdb=async function main() {
const db = await mongoose.connect(
  "mongodb+srv://mangalkgupta004:qJYuW7Nk0QuOlp3T@cluster0.ltg6mvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
  console.log(`db connected ${db.connection.host}`);
}
export default connectdb;
