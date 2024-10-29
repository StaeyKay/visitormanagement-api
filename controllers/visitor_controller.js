import { VisitorModel } from "../models/visitor_model.js"


// Function to add a visitor
export const addVisitor = async (req, res) => {
    try {
        const visitor = await VisitorModel.create(req.body)
        res.status(200).json(visitor)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}

// Function to get visitor by id
export const getVisitor = async (req, res) => {
    try {
        
        const visitor = await VisitorModel.findById(req.params.id)
        res.status(200).json(visitor);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}

// Function to get all visitors and filter visitors
export const getAllVisitors = async (req, res) => {
    try {
        const {filter, fields, limit} = req.query
    
        const queryFilter = filter ? JSON.parse(filter) : {};
        const selectFields = fields ? JSON.parse(fields) : "";
    
        const visitors = await VisitorModel
        .find(queryFilter)
        .select(selectFields)
        .limit(Number(limit) || 0)
    
        res.status(200).json(visitors)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}