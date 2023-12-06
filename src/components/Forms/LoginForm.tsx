'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    });
  };

  return (
    <div className="flex flex-col items-center max-h-screen">
      <div className="border rounded-sm p-4">
        <div className="mb-2">
          <h1 className="font-bold text-base">Login</h1>
          <p className="text-sm">Enter credentials to login</p>
        </div>
        <form onSubmit={onSubmit}>
          <Label className="" htmlFor="username">
            Username
          </Label>
          <Input id="username" name="username" type="text" />
          <Label className="" htmlFor="password">
            Password
          </Label>
          <Input id="password" name="password" type="password" />
          <div className="flex justify-between">
            <Button className="mt-2" disabled={isLoading}>
              {isLoading && <Loader2 className="h4 w-4 animate-spin inline" />}
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
