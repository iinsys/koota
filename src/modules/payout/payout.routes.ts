import { Router } from "express";
import * as payoutController from "./payout.controller";
import { validate, payoutValidation } from "../../middlewares/validator";

const router = Router();

/**
 * @swagger
 * /groups/{groupId}/payout:
 *   post:
 *     summary: Create a new payout
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/groups/:groupId/payout",
  payoutValidation,
  validate,
  payoutController.createPayout
);

export default router;
