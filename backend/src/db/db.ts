import mongoose from "mongoose";
import variables from '../../variables';

const { MONGODB_URI } = variables;

const connectDb = async () => {
  await mongoose.connect(MONGODB_URI as string, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("DB Connected");
};

export default connectDb;
