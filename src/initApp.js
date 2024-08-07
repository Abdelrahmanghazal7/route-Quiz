import * as routers from "../src/modules/index.routes.js";
import connectionDB from "../db/connectionDB.js";
import { AppError } from "../src/utils/classError.js";
import { globalErrorHandling } from "../src/utils/globalErrorHandling.js";

export const initApp = (app, express) => {

  // connect to db
  connectionDB();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("server is running");
  });

  app.use("/users", routers.userRouter);
  app.use("/accounts", routers.accountRouter);

  // handle invaild URLs
  app.use("*", (req, res, next) => {
    return next(new AppError(`invalid url ${req.originalUrl}`, 404));
  });

  // global error handler
  app.use(globalErrorHandling);
};
