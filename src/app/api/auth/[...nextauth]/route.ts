import { dbClient } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
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
      async authorize(credentials, req) {
        const response = await dbClient.query.users.findFirst({
          where: (users, { eq }) => eq(users.username, credentials?.username),
        });
        console.log(response);
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
