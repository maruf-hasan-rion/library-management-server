import express, { Application, Request, Response } from "express";
import cors from "cors";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/globalErrorHandler";
import routes from "./routes";

const app: Application = express();

const middlewares = [
  cors({
    origin: [
      "https://library-management-client-gamma-blue.vercel.app",
      "http://localhost:5173",
    ],
  }),
  express.json(),
  express.urlencoded({ extended: true }),
];

app.use(middlewares);
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
