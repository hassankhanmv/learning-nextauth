import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname, "pathname");
    console.log(req.nextauth.token?.role, "role");

    if (
      req.nextUrl.pathname.startsWith("/CreateUser") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = { matcher: ["/CreateUser"] };

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth({
//   callbacks: {
//     authorized: ({ req, token }) => {
//       const path = req.nextUrl.pathname;

//       // Check if the middleware is processing the
//       // route which requires a specific role
//       if (path.startsWith("/CreateUser")) {
//         return token?.role === "admin";
//       }

//       // By default return true only if the token is not null
//       // (this forces the users to be signed in to access the page)
//       return token !== null;
//     },
//   },
// });
// export const config = {
//   matcher: ["/CreateUser", "/profile/:path*", "/admin/:path*"],
// };
