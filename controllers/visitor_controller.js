import { VisitorModel } from "../models/visitor_model.js";

// Function to add a visitor
export const addVisitor = async (req, res) => {
  try {
    const visitor = await VisitorModel.create(req.body);
    res.status(200).json({ message: "Check-in successful", visitor });
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

    // Define time ranges for daily and monthly counts
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    // Get daily and monthly visitor counts
    const dailyCount = await VisitorModel.countDocuments({
      arrivalTime: { $gte: startOfDay, $lte: endOfDay },
    });

    const monthlyCount = await VisitorModel.countDocuments({
      arrivalTime: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const visitors = await VisitorModel.find(queryFilter)
      .select(selectFields)
      .sort({ arrivalTime: -1 })
      .limit(Number(limit) || 0)
      .skip(skip);

    // Calculate total time spent for each visitor
    const visitorsWithTimeSpent = visitors.map((visitor) => {
      const arrival = new Date(visitor.arrivalTime);
      const departure = visitor.departureTime ? new Date(visitor.departureTime) : null;
      
      const totalTimeSpent = departure
        ? Math.round((departure - arrival) / 60000) // Convert to minutes
        : null;

      return {
        ...visitor.toObject(),
        totalTimeSpent, // Add the calculated field
      };
    });

    res.status(200).json({visitors: visitorsWithTimeSpent, dailyCount, monthlyCount});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// Function to update the departure time of a visitor
export const updateTime = async (req, res) => {
  try {
    const visitor = await VisitorModel.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    // Check if visitor has already checked out
    if (visitor.departureTime) {
      return res.status(400).json({
        error: "Visitor has already checked out",
        checkoutTime: visitor.departureTime,
      });
    }

    // Update departure time only if not already set
    const updatedVisitor = await VisitorModel.findByIdAndUpdate(
      req.params.id,
      { departureTime: new Date() },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Checkout successful", visitor: updatedVisitor });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};
