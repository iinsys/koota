import { Router } from "express";
import * as contributionController from "./contribution.controller";
import {
  validate,
  createContributionValidation,
} from "../../middlewares/validator";

const router = Router();

/**
 * @swagger
 * /groups/{groupId}/contributions:
 *   post:
 *     summary: Create a new contribution
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
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/groups/:groupId/contributions",
  createContributionValidation,
  validate,
  contributionController.createContribution
);

export default router;
