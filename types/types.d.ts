
import "next-auth";

import "next-auth";
export type SessionUser = {
    id: string;
    photoUrl?: string;
    firstName: string;
    lastName: string;
    cnic: string;
    mobile: string;
    email: string;
    gender: string; 
    dob: Date;
    profession: string;
    yearsOfExperience: number;
    professionCat: string;
    professionSubCat: string;
    emailVarified?: Date
    role: string;
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      // user: SessionUser & DefaultSession["user"]
      user: SessionUser
    }
  }
  
  declare module "next-auth/jwt" {
      /**
       * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
       */
      interface JWT {
        user: SessionUser
      }
    }