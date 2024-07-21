import express, { Request, Response } from "express";
const router = express.Router();

router.get("/healthcheck", (req: Request, res: Response) =>
  res.sendStatus(200)
);
export const API_v1 = router;
