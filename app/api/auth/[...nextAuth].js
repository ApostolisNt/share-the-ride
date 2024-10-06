import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../lib/mongodb";
import Users from "../../models/users";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to MongoDB
        await connectMongoDB();

        // Find user by email
        const user = await Users.findOne({
          "contact.email": credentials.email,
        });
        if (!user) {
          throw new Error("No user found with this email");
        }

        // Compare hashed passwords
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return the user object without the password for the session
        return {
          id: user._id,
          name: user.name,
          email: user.contact.email,
          userStatus: user.userStatus,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userStatus = user.userStatus;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.userStatus = token.userStatus;
      }
      return session;
    },
  },
});
