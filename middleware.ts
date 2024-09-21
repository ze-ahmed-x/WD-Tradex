// // // Default code
// export { default } from "next-auth/middleware";

// export const config = {
// //   matcher: ["/profile", "/admin/:path*", "/client/:path*", "/server"],
//   matcher: ["/about", "/admin/:path*", "/client/:path*", "/server"],
// };

// Code with role based auth
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) return token?.user.role === "admin";
      return !!token;
    },
  },
});
export const config = { matcher: ["/admin/:path*", "/user/:path*"] };