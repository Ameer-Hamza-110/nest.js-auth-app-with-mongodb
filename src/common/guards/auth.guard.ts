import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../../user/model/user.model.js';


interface AuthPayload extends JwtPayload {
  sub: string,
  email: string,
  role: UserRole
}
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const authHeader = req.headers["authorization"]
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Invalid token or no token")
    }

    const token = authHeader.split(" ")[1]

    const secret = process.env.JWT_SECRET
    if (!secret || !token) {
      throw new Error("invalid token")
    };

    
    try {
      const decoded = jwt.verify(token, secret) as AuthPayload;

      if (
        typeof decoded === "string" ||
        typeof decoded.sub !== "string" ||
        typeof decoded.email !== "string"
      ) {
        throw new UnauthorizedException("Invalid token payload")
      }

      req.user = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role
      };


      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
