import { dbClient } from '@/db/db';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
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
        if (user) {
          return {
            id: user.id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName,
          };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
