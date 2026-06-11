import { Request, Response } from "express"
import { UserModel } from "../models/userModel"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AuthRequest } from "../middleware/middleware"

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" })

    const existing = await UserModel.findOne({ email })
    if (existing)
      return res.status(409).json({ message: "Email already registered" })

    const hashedPassword = await bcrypt.hash(password, 10)
    await UserModel.create({ username, email, password: hashedPassword })

    return res.status(201).json({ message: "Signed up successfully" })
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" })

    const user = await UserModel.findOne({ email })
    if (!user)
      return res.status(403).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(403).json({ message: "Invalid credentials" })

    const token = jwt.sign(
      { _id: user._id },
      `${process.env.JWT_PASSWORD}`,
      { expiresIn: "7d" }    // token expires in 7 days
    )

    return res.status(200).json({ token })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}


// PUT /api/v1/user/update
export const updateUser = async (req: AuthRequest, res: Response) => {
  const { username, email, password } = req.body
  const update: any = {}
  if (username) update.username = username
  if (email)    update.email    = email
  if (password) update.password = await bcrypt.hash(password, 10)

  await UserModel.findByIdAndUpdate(req.userId, update)
  res.json({ message: "Profile updated" })
}