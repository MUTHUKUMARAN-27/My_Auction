import User from './models/User.js';
import bcrypt from 'bcryptjs';
import connectToDatabase from './db/db.js';
const userRegister = async () => {
    connectToDatabase()
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            username: "Admin",
            email: "admin@gmail.com",
            passwordHash: hashPassword,
            role: "admin"
        });

        await newUser.save();
    } catch (error) {
        console.log(error);
    }
};

userRegister();
