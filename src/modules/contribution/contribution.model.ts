import { Schema, model, Document } from "mongoose";

export interface IContribution extends Document {
  groupId: Schema.Types.ObjectId;
  memberId: Schema.Types.ObjectId;
  cycleNumber: number;
  amount: number;
  status: "PAID" | "PENDING";
  paidAt: Date;
}

const contributionSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  cycleNumber: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["PAID", "PENDING"], default: "PAID" },
  paidAt: { type: Date, default: Date.now }
});

contributionSchema.index(
  { memberId: 1, cycleNumber: 1 },
  { unique: true }
);

export const Contribution = model<IContribution>("Contribution", contributionSchema);
