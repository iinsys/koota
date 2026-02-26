import { Router } from "express";
import * as groupController from "./group.controller";
import { validate, createGroupValidation } from "../../middlewares/validator";

const router = Router();

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Retrieve a list of groups
 *     responses:
 *       200:
 *         description: A list of groups.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
router.get("/groups", groupController.getGroups);

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 */
router.post(
  "/groups",
  createGroupValidation,
  validate,
  groupController.createGroup
);

/**
 * @swagger
 * /groups/{groupId}/defaulters:
 *   get:
 *     summary: Get a list of defaulters for a group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of defaulters.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get("/groups/:groupId/defaulters", groupController.getDefaulters);

/**
 * @swagger
 * /groups/{groupId}/stats:
 *   get:
 *     summary: Get statistics for a group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group statistics.
 */
router.get("/groups/:groupId/stats", groupController.getGroupStats);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         contributionAmount:
 *           type: number
 *         frequency:
 *           type: string
 *           enum: [monthly, weekly]
 *     Member:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *         phone:
 *           type: string
 */
