import { loginUser } from "@/lib/database/actions/user.action";
import { IUser } from "@/lib/database/models/user.model";
import { SessionUser } from "@/types/types";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login'
  },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
                const user = await loginUser({username: String(credentials?.username), password: String(credentials?.password)})
                if (user) {
                  const sUser: SessionUser = { cnic: user.cnic, dob: user.dob, email: user.email, firstName: user.firstName, gender: user.gender, id : user._id, lastName: user.lastName, mobile: user.mobile, profession: user.profession, professionCat: user.professionCat, professionSubCat: user.professionSubCat, role: String(user.role), yearsOfExperience: user.yearsOfExperience, emailVarified: user.emailVarified, photoUrl: user.photoUrl };
                  return sUser
                }
                else return  null
            // const res = await fetch("/your/endpoint", {
            //   method: 'POST',
            //   body: JSON.stringify(credentials),
            //   headers: { "Content-Type": "application/json" }
            // })
            // const user = await res.json()
      
            // // If no error and we have user data, return it
            // if (res.ok && user) {
            //   return user
            // }
            // // Return null if user data could not be retrieved
            // return null
          }
        })
      ],
      session: {
        strategy: "jwt"
    },
    callbacks: {
      async jwt({ token, user, trigger, session }) {
        if (trigger === "update" && session?.user) {
          token.user = session.user // this will update the user when we call update() from client
          return token
        }
        if (user) token.user = user as SessionUser
        return token;
      },
  
      async session({ token, session }) {
        session.user = token.user as SessionUser;
        return session;
      },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
