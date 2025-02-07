import { EmployeeModel } from "../models/employee_model.js";

// Function to add an employee
export const addEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.status(200).json({ message: "Submitted successfully", employee });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// Function to get all staff
export const getEmployees = async (req, res) => {
  try {
    const employee = await EmployeeModel.find();
    res.status(200).json(employee)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}