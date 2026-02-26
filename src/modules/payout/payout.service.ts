import { Payout } from "./payout.model";
import { Group } from "../group/group.model";
import { Member } from "../member/member.model";
import { Contribution } from "../contribution/contribution.model";
import mongoose from "mongoose";

export const createPayout = async (groupId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const group = await Group.findById(groupId).session(session);
    if (!group) {
      throw new Error("Group not found");
    }

    const totalMembers = await Member.countDocuments({
      groupId: new mongoose.Types.ObjectId(groupId),
    } as any).session(session);
    const totalPaid = await Contribution.countDocuments({
      groupId: new mongoose.Types.ObjectId(groupId),
      cycleNumber: group.currentCycle,
      status: "PAID",
    } as any).session(session);

    if (totalPaid !== totalMembers) {
      throw new Error(
        "Not all members have paid their contributions for the current cycle"
      );
    }

    const memberToReceive = await Member.findOne({
      groupId: new mongoose.Types.ObjectId(groupId),
      rotationOrder: group.currentCycle,
    } as any).session(session);

    if (!memberToReceive) {
      throw new Error("No member found for the current payout cycle");
    }

    if (memberToReceive.hasReceived) {
      throw new Error("Member has already received payout for this cycle");
    }

    const totalPot = group.contributionAmount * totalMembers;

    const payout = new Payout({
      groupId: new mongoose.Types.ObjectId(groupId),
      memberId: memberToReceive._id,
      cycleNumber: group.currentCycle,
      totalAmount: totalPot,
    });

    await payout.save({ session });

    memberToReceive.hasReceived = true;
    await memberToReceive.save({ session });

    group.currentCycle++;
    await group.save({ session });

    await session.commitTransaction();
    session.endSession();

    return payout;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
