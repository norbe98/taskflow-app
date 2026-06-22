import type { Request } from "express"

export type JwtUser = {
    id: number,
    email: string
}

export type AuthRequest = Request & {
    user?: JwtUser
}