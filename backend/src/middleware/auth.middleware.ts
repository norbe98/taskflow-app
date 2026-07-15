import type { NextFunction, Response } from "express";
import type { AuthRequest, JwtUser } from "../types/types.js";
import jwt from 'jsonwebtoken'

export default function authMiddleware(
req: AuthRequest,
res: Response,
next: NextFunction
) {

    const header = req.headers.authorization

    if(!header) return res.status(401).json({ message: "Auth problem" })

    const token = header.split(" ")[1]

    if(!token) return res.status(401).json({ message: "Token not found" })

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtUser

        req.user = decoded
        next()
    } catch {
        return res.status(401).json({
            message: "Your session is invalid or has expired."
        })
    }
}