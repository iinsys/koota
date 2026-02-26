import { Schema, model, Document } from "mongoose";

export interface IMember extends Document {
  groupId: Schema.Types.ObjectId;
  fullName: string;
  phone?: string;
  rotationOrder: number;
  hasReceived: boolean;
  totalContributed: number;
}

const memberSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  fullName: { type: String, required: true },
  phone: { type: String },
  rotationOrder: { type: Number, required: true },
  hasReceived: { type: Boolean, default: false },
  totalContributed: { type: Number, default: 0 }
});

export const Member = model<IMember>("Member", memberSchema);
