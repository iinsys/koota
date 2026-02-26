import { Contribution, IContribution } from "./contribution.model";
import { Group } from "../group/group.model";
import { Member } from "../member/member.model";

export const createContribution = async (
  groupId: string,
  contributionData: Partial<IContribution>
) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }

  const { memberId, amount } = contributionData;
  if (!memberId || !amount) {
    throw new Error("Member ID and amount are required");
  }

  const member = await Member.findById(memberId);
  if (!member) {
    throw new Error("Member not found");
  }

  if (amount !== group.contributionAmount) {
    throw new Error("Incorrect contribution amount");
  }

  const existingContribution = await Contribution.findOne({
    groupId: groupId as any,
    memberId: memberId as any,
    cycleNumber: group.currentCycle,
  });

  if (existingContribution) {
    throw new Error("Member has already contributed for this cycle");
  }

  const contribution = new Contribution({
    groupId: groupId as any,
    memberId: memberId as any,
    amount,
    cycleNumber: group.currentCycle,
  });

  await contribution.save();

  member.totalContributed += amount;
  await member.save();

  return contribution;
};
