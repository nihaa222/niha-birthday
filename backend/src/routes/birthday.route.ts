
import express from "express"
import { createBirthdayUser, getBirthdayUser } from "../controllers/birthday";


const router = express.Router();

router.post("/create", createBirthdayUser);
router.get("/getuser/:id", getBirthdayUser)

export default router;