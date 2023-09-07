// jwt.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization; // Lấy token từ tiêu đề Authorization

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' }); // Không có token, từ chối yêu cầu
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' }); // Token không hợp lệ
      }

      // Token hợp lệ, gắn thông tin người dùng vào yêu cầu
      req['user'] = decoded;
      next();
    });
  }
}
