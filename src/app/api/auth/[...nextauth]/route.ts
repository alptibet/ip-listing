import { dbClient } from '@/db/db';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        const user = await dbClient.query.users.findFirst({
          where: (users, { eq }) =>
            eq(users.username, credentials?.username as string),
        });
        const passwordCorrect = await compare(
          credentials?.password || '',
          user?.password || ''
        );
        if (passwordCorrect) {
          return {
            id: user?.id,
            username: user?.username,
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            userRole: user?.userRole,
            isActive: user?.isActive,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.userRole = user.userRole;
        token.isActive = user.isActive;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.userRole = token.userRole;
        session.user.isActive = token.isActive;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
