import app from "./app";
import connectDb from "./db/db";
import errorHandler from "./middlewares/error";

const main = async () => {
  await connectDb();

  app.use(errorHandler);

  await app.listen(app.get("port"));
  console.log("Listening");
};

main();
