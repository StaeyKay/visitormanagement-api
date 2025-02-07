import { Router } from "express";
import { addEmployee, getEmployees } from "../controllers/employee_controller.js";

export const employeeRouter = Router();

employeeRouter.post("/employee", addEmployee)
employeeRouter.get("/employee", getEmployees)