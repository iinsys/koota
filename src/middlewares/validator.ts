import { Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const createGroupValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("contributionAmount")
    .isFloat({ gt: 0 })
    .withMessage("Contribution amount must be a positive number"),
  body("frequency")
    .isIn(["monthly", "weekly"])
    .withMessage("Frequency must be either monthly or weekly"),
];

export const addMemberValidation = [
  param("groupId").isMongoId().withMessage("Invalid group ID"),
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("phone").optional().isString(),
];

export const createContributionValidation = [
  param("groupId").isMongoId().withMessage("Invalid group ID"),
  body("memberId").isMongoId().withMessage("Invalid member ID"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
];

export const payoutValidation = [
  param("groupId").isMongoId().withMessage("Invalid group ID"),
];
