import { Request, Response } from "express";
import * as memberService from "./member.service";

export const addMember = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    if (typeof groupId !== "string") {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const member = await memberService.addMember(groupId, req.body);
    res.status(201).json(member);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    if (typeof memberId !== "string") {
      return res.status(400).json({ message: "Invalid memberId" });
    }
    const member = await memberService.updateMember(memberId, req.body);
    res.status(200).json(member);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    if (typeof memberId !== "string") {
      return res.status(400).json({ message: "Invalid memberId" });
    }
    const member = await memberService.deleteMember(memberId);
    res.status(200).json(member);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
