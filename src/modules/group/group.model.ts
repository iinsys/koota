import { Schema, model, Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  contributionAmount: number;
  frequency: "monthly" | "weekly";
  currentCycle: number;
  createdAt: Date;
}

const groupSchema = new Schema({
  name: { type: String, required: true },
  contributionAmount: { type: Number, required: true },
  frequency: { type: String, enum: ["monthly", "weekly"], required: true },
  currentCycle: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export const Group = model<IGroup>("Group", groupSchema);
