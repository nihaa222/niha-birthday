
import express from "express"
import { createBirthdayUser } from "../controllers/birthday";


const router = express.Router();

router.post("/create", createBirthdayUser);

export default router;