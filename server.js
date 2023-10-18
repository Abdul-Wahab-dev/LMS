const app = require("./app");
const mongoose = require("mongoose");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION APP is shutting down....");
  process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: ".env" });
}

// 3) connect to db
mongoose
  .connect(
    process.env.mongoURI,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

//4) Start Server
const port = process.env.PORT || 8000;

// Listening server
app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});
