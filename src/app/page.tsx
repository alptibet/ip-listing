import { redirect } from 'next/navigation';

export default async function Home() {
  const user = 'Alp Tibet';
  if (user) {
    redirect('/dashboard');
  }
  return;
}
