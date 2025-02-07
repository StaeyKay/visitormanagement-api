import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const employeeSchema = new Schema(
    {
        fullName: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        department: {type: String, required: true},
        keyNumber: {type: String, required: true},
        time: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

employeeSchema.plugin(toJSON);

export const EmployeeModel = model("Employee", employeeSchema);