import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect('/dashboard');
  }
  return;
}
