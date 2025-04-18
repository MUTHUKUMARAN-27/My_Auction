import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
    } catch (error) {
        console.log(error);
    }
};

export default connectToDatabase;
