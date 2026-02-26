import { Group, IGroup } from "./group.model";
import { Member } from "../member/member.model";
import { Contribution } from "../contribution/contribution.model";
import mongoose from "mongoose";

export const createGroup = async (groupData: Partial<IGroup>) => {
  const group = new Group(groupData);
  return await group.save();
};

export const getGroups = async () => {
  return await Group.find();
};

export const getDefaulters = async (groupId: string) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }

  const members = await Member.find({ groupId: new mongoose.Types.ObjectId(groupId) as any });
  const contributions = await Contribution.find({
    groupId: new mongoose.Types.ObjectId(groupId) as any,
    cycleNumber: group.currentCycle,
  });

  const paidMemberIds = contributions.map((c) => c.memberId.toString());
  const defaulters = members.filter(
    (m) => !paidMemberIds.includes(m._id.toString())
  );

  return defaulters;
};

export const getGroupStats = async (groupId: string) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }

  const totalCyclesCompleted = group.currentCycle - 1;

  const totalMoneyContributed = await Contribution.aggregate([
    { $match: { groupId: new mongoose.Types.ObjectId(groupId) } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const nextMemberToReceive = await Member.findOne({
    groupId: new mongoose.Types.ObjectId(groupId) as any,
    rotationOrder: group.currentCycle,
  });

  return {
    totalCyclesCompleted,
    totalMoneyContributed: totalMoneyContributed[0]?.total || 0,
    nextMemberToReceive,
  };
};
