import { Schema, model, Document } from "mongoose";

export interface IPayout extends Document {
  groupId: Schema.Types.ObjectId;
  memberId: Schema.Types.ObjectId;
  cycleNumber: number;
  totalAmount: number;
  paidAt: Date;
}

const payoutSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  cycleNumber: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paidAt: { type: Date, default: Date.now }
});

export const Payout = model<IPayout>("Payout", payoutSchema);
