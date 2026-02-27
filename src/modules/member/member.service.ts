import { Member, IMember } from "./member.model";
import { Group } from "../group/group.model";
import { Contribution } from "../contribution/contribution.model";
import mongoose from "mongoose";

export const addMember = async (
  groupId: string,
  memberData: Partial<IMember>
) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }

  const memberCount = await Member.countDocuments({ groupId: groupId as any });
  memberData.rotationOrder = memberCount + 1;
  memberData.groupId = group._id as any;

  const member = new Member(memberData);
  return await member.save();
};

export const updateMember = async (
  memberId: string,
  memberData: Partial<IMember>
) => {
  const member = await Member.findByIdAndUpdate(memberId, memberData, {
    new: true,
  });
  if (!member) {
    throw new Error("Member not found");
  }
  return member;
};

export const deleteMember = async (memberId: string) => {
  const member = await Member.findByIdAndDelete(memberId);
  if (!member) {
    throw new Error("Member not found");
  }
  // Also delete all contributions associated with the member
  await Contribution.deleteMany({ memberId: new mongoose.Types.ObjectId(memberId) as any });
  return member;
};
