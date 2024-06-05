import express, { type Request, type Response } from "express";
import { mangasRouter } from "@/routes/Mangas";
import "dotenv/config";
import { globalMiddleware } from "./middlewares/global";
import session, { Session } from "express-session";

import { mockUsers } from "./db/mockUsers";
import type { CustomSessionData } from "types/mangaProps";
import { authRouter } from "./routes/Auth";

const app = express();

// Middlewares Global
app.use(globalMiddleware);

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7, // 1 week
    },
  })
);

app.use(express.json());
app.use("/api/v1/mangas", mangasRouter);
app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
