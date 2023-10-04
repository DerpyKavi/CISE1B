
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://newuser:5Ivj1Y97H5RjMG53@mernstack.aanyxwa.mongodb.net/?retryWrites=true&w=majority';

const connectDB = () => {
    return mongoose.connect(MONGODB_URI,{
    userNewURLParser: true,
    useUnifiedTopology: true,
    });
};

export default connectDB;
