import { Router } from "express";
import * as memberController from "./member.controller";
import { validate, addMemberValidation } from "../../middlewares/validator";

const router = Router();

/**
 * @swagger
 * /groups/{groupId}/members:
 *   post:
 *     summary: Add a new member to a group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 */
router.post(
  "/groups/:groupId/members",
  addMemberValidation,
  validate,
  memberController.addMember
);

export default router;
