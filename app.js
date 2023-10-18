const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const complainRouter = require("./routes/complainRoutes");
const News = require("./routes/newsRoutes");
const OfficalDocs = require("./routes/officalDocsRoutes");
const assignment = require("./routes/assignmentRoutes");
const FYP = require("./routes/FYPRoutes");
const Team = require("./routes/teamRoutes");
const Events = require("./routes/eventRoutes");
const Internship = require("./routes/internshipRoutes");
const CSP = require("./routes/cspRoutes");
const PEC = require("./routes/pecDocsRoutes");
const Events = require("./routes/eventRoutes");
const Slider = require("./routes/sliderRoutes");
const programAndBatch = require("./routes/programAndBatchRoutes");
const quote = require("./routes/quoteRoutes");

const path = require("path");

const globalErrorHandler = require("./contorller/errorController");
// middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/complains", complainRouter);
app.use("/api/v1/news", News);
app.use("/api/v1/officalDocs", OfficalDocs);
app.use("/api/v1/assignment", assignment);
app.use("/api/v1/fyp", FYP);
app.use("/api/v1/event", Events);
app.use("/api/v1/team", Team);
app.use("/api/v1/internship", Internship);
app.use("/api/v1/csp", CSP);
app.use("/api/v1/pec", PEC);
app.use("/api/v1/slider", Slider);
app.use("/api/v1/programandbatch", programAndBatch);
app.use("/api/v1/quote", quote);

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("view/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "view", "build", "index.html"));
//   });
// }

app.get("/getFileFromLocalStorage", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "view", "src", "AllFilesStorage", "eye.png")
  );
});
// Global Express Error Handler
app.use(globalErrorHandler);

module.exports = app;
