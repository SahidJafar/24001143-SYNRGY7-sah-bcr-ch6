declare namespace Express {
  export interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      token: string;
      refresh_token: string;
    }
  }
}