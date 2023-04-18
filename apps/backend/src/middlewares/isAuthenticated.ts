import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");

  try {
    //Validate Token
    const { sub } = verify(token, process.env.JWT_SECRET_KEY) as PayLoad;

    //Recovery token_id and push into req
    req.user_id = sub;

    return next();
  } catch {
    return res.status(401).end();
  }
}
