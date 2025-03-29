import express from "express";
import dotenv from "dotenv";
import { DbConnect } from "./db/dbConnect";
import cookieParser from "cookie-parser";
import cors from "cors";
import { startApolloServer } from "./apollo/apolloServer";
import path from "path";
const __dirname = path.resolve();
const app = express();
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  express.json({
    limit: "50mb",
    verify: (req: express.Request, res: express.Response, buf: Buffer) => {
      (req as any).rawBody = buf.toString();
    },
  })
);

app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 5000;
DbConnect();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    const indexPath = path.resolve(__dirname, "../frontend/dist/index.html");
    res.sendFile(indexPath);
  });
}

async function startServer() {
  await startApolloServer(app);
}

startServer();
