import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      token?: string;
      name?: string;
      email?: string;
      image?: string;
      role?: string;
      userId?: string;
    };
  }
  
  interface User {
    id: string;
    address: string;
    token?: string;
    name?: string;
    role?: string;
    userId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    token?: string;
    name?: string;
    role?: string;
    userId?: string;
  }
}
