import app from "./app";
import connectDb from "./db/db";

const main = async () => {
  await connectDb();
  await app.listen(app.get("port"));
  console.log("Listening");
};

main();
