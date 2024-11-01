import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const visitorSchema = new Schema(
  {
    visitorName: { type: String, required: true },
    employeeName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    purposeOfVisit: { type: String, required: true },
    arrivalTime: { type: Date, default: Date.now },
    departureTime: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

visitorSchema.plugin(toJSON);

export const VisitorModel = model("Visitor", visitorSchema);
