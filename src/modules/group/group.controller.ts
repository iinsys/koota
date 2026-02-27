import { Request, Response } from "express";
import * as groupService from "./group.service";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const group = await groupService.createGroup(req.body);
    res.status(201).json(group);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.getGroups();
    res.status(200).json(groups);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDefaulters = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    if (typeof groupId !== "string") {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const defaulters = await groupService.getDefaulters(groupId);
    res.status(200).json(defaulters);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGroupStats = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    if (typeof groupId !== "string") {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const stats = await groupService.getGroupStats(groupId);
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    if (typeof groupId !== "string") {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const group = await groupService.updateGroup(groupId, req.body);
    res.status(200).json(group);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    if (typeof groupId !== "string") {
      return res.status(400).json({ message: "Invalid groupId" });
    }
    const group = await groupService.deleteGroup(groupId);
    res.status(200).json(group);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
