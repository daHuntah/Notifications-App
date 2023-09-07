declare namespace Express {
    interface Request {
      user?: any; // Thay any bằng định dạng chính xác của thông tin người dùng nếu cần
    }
  }