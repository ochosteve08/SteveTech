require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbCon");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

// custom middleware
const errorHandler = require("./middleware/errorHandler");
const { logEvents, logger } = require("./middleware/logger");

connectDB();

app.use(logger);

app.use(express.json());

app.use(cookieParser());
app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: "http://localhost:3500",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/user", require("./routes/user.routes"));
app.use("/note", require("./routes/notes.routes"));


app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    console.log("html testing");
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.info("connected to mongodb");

  app.listen(PORT, () => {
    console.log(`server running on ${process.env.APP_HOST}:${PORT} `);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  logEvents(
    `${error.no}:${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongoErrorLog.log"
  );
});
