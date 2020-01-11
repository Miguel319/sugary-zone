import app from "./app";

const main = async () => {
  await app.listen(4000);
  console.log('Listening')
};


main();