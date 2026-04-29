
import { Request, Response } from "express"
import Birthday from "../models/birthday.model";

interface BirthdayBody {
  name: string;
  age: number;
  message: string;
}

const generateCode = () => Math.random().toString(36).substring(2, 8)

export const createBirthdayUser = async (req: Request<{}, {}, BirthdayBody>, res: Response) => {
  try {
    const { name, age, message } = req.body
    if (!name || !age || !message) {
      res.status(400).json({ message: "All fields are required" })
      return;
    }

    const user = await Birthday.create({
      name,
      age,
      message,
      uniqueCode: generateCode()
    });

    res.status(201).json(user);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error instanceof Error
        ? error.message
        : "Internal Server Error"
    })
  }
}

export const getBirthdayUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Birthday.findOne({ uniqueCode: id })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send({ birthdayUser: user })
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error"
    })
  }
}