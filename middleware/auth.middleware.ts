import { NextApiRequest, NextApiResponse } from "next"
import {
  createMiddlewareDecorator,
  NextFunction,
  NotFoundException,
  UnauthorizedException,
} from "next-api-decorators"
import Auth from "../Models/Auth"
import dbConnect from "../utils/db"

export const getApiKeys = async () => {
  await dbConnect()
  const result = Auth.findOne({ collectionName: "AllowList" }).lean()
  return result
}
export const AllowListAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
      throw new NotFoundException("Authorization header not found")
    }
    const [, token] = authorization.split(" ")
    const apiKeys = await getApiKeys()
    if (token !== apiKeys.apiKey) {
      throw new UnauthorizedException("Invalid token")
    }
    next()
  },
)
