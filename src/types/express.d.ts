import * as express from 'express';
import { UserRole } from '../user/model/user.model.ts';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                role: UserRole
            }
        }
    }
}