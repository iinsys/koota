import { Member, IMember } from "./member.model";
import { Group } from "../group/group.model";

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
