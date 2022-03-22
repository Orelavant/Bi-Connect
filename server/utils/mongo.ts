import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToMongo = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
