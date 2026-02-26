import { Request, Response } from "express";
import * as payoutService from "./payout.service";

export const createPayout = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    if (typeof groupId !== "string") {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const payout = await payoutService.createPayout(groupId);
    res.status(201).json(payout);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
