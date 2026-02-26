import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import groupRoutes from "./modules/group/group.routes";
import memberRoutes from "./modules/member/member.routes";
import contributionRoutes from "./modules/contribution/contribution.routes";
import payoutRoutes from "./modules/payout/payout.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// API Routes
app.use("/api", groupRoutes);
app.use("/api", memberRoutes);
app.use("/api", contributionRoutes);
app.use("/api", payoutRoutes);

// Swagger
setupSwagger(app);

// Error Handler
app.use(errorHandler);

export default app;
