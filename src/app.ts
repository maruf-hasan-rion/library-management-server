import express, { Application, Request, Response } from "express";
import cors from "cors";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/globalErrorHandler";
import routes from "./routes";

const app: Application = express();

const middleware = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
];
app.use(middleware);
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: `Sever is running` });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
