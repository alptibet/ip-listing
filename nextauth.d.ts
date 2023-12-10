import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    userRole: string;
    isActive: boolean;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    userRole: string;
    isActive: boolean;
  }
}
