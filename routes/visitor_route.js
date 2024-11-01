import { Router } from "express";
import {
  addVisitor,
  getAllVisitors,
  updateTime,
} from "../controllers/visitor_controller.js";

export const visitorRouter = Router();

visitorRouter.post("/visitors", addVisitor);

visitorRouter.get("/visitors", getAllVisitors);

visitorRouter.patch("/visitors/:id", updateTime);
