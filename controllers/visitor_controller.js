import { VisitorModel } from "../models/visitor_model.js";

// Function to add a visitor
export const addVisitor = async (req, res) => {
  try {
    const visitor = await VisitorModel.create(req.body);
    res.status(200).json(visitor);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// Function to get visitor by id
export const getVisitor = async (req, res) => {
  try {
    const visitor = await VisitorModel.findById(req.params.id);
    res.status(200).json(visitor);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// Function to get all visitors and filter visitors
export const getAllVisitors = async (req, res) => {
  try {
    const { filter, fields, limit, skip } = req.query;

    const queryFilter = filter ? JSON.parse(filter) : {};
    const selectFields = fields ? JSON.parse(fields) : "";

    // Add regex-based filtering for partial matches and case insensitivity
    if (queryFilter.visitorName) {
      queryFilter.visitorName = {
        $regex: queryFilter.visitorName,
        $options: "i",
      };
    }

    // Add regex-based filtering for partial matches and case insensitivity
    if (queryFilter.employeeName) {
      queryFilter.employeeName = {
        $regex: queryFilter.employeeName,
        $options: "i",
      };
    }

    // Add regex-based filtering for partial matches and case insensitivity for arrival date
    if (queryFilter.arrivalTime) {
      queryFilter.arrivalTime = {
        $regex: queryFilter.arrivalTime,
      };
    }

    const visitors = await VisitorModel.find(queryFilter)
      .select(selectFields)
      .limit(Number(limit) || 0)
      .skip(skip);

    res.status(200).json(visitors);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};
