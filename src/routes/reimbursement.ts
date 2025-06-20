import { Hono } from "hono";
import * as controller from "../modules/controllers/reimbursement";
import { UserMiddleware } from "../types";
import { addRequestInfoToBody } from "../helpers/info";

const reimbursement = new Hono<{ Variables: UserMiddleware }>();

reimbursement.post("/submit", async (c) => {
  const body = await addRequestInfoToBody(c);
  return c.json(await controller.createReimbursement(body, c.get("user")), 201);
});

reimbursement.get("/:reimbursement_id", async (c) => {
  return c.json(await controller.showReimbursement(c));
});

reimbursement.get("/", async (c) => {
  return c.json(await controller.indexReimbursement(c));
});

export const reimbursementRoute = reimbursement;
