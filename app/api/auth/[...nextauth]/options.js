import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../(models)/user.model";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "enter your email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials) {
        try {
          console.log(credentials.email, "email");
          console.log(credentials.password, "password");
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();
          console.log(foundUser, "foundUser");

          if (foundUser) {
            console.log("User Exists!");
            const match = await bcrypt?.compare(
              credentials.password,
              foundUser.password
            );
            if (match) {
              console.log("password Correct!");
              delete foundUser.password;
              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error, "error");
        }
        return null;
      },
    }),
    GitHubProvider({
      profile(profile) {
        console.log("Github profile ->>> ", profile);

        let userRole = "Github User";
        if (profile?.email === "mhassankhanw3@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Google profile ->>> ", profile);
        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    DiscordProvider({
      profile(profile) {
        console.log("Discord profile ->>> ", profile);
        console.log("Discord profile avatar ->>> ", profile.avatar);
        let userRole = "Discord User";
        return {
          ...profile,
          role: userRole,
        };
        // return { ...profile, id: profile.id, role: userRole };
      },
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
