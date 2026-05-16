import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

import { seedAdmin } from "./seed/user.seed.js";
import userRoutes from "./routes/user.routes.js";

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/v1/users", userRoutes);

seedAdmin();

export default app;
