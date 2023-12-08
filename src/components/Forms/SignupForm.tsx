'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from '../ui/use-toast';

const usersApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000',
});

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUserData = {
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
      firstName: formData.get('firstname'),
      lastName: formData.get('lastname'),
    };
    try {
      setIsLoading(true);
      await usersApi.post('api/auth/signup', newUserData);
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-h-screen">
      <div className="border rounded-sm p-4">
        <div className="mb-2">
          <h1 className="font-bold text-base">Create an account</h1>
          <p className="text-sm">Fill the form to create your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <Label htmlFor="username">Username</Label>
            <Input className="mt-1" id="username" name="username" type="text" />
          </div>

          <div className="mb-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="mt-1"
              id="password"
              name="password"
              type="password"
            />
          </div>

          <div className="mb-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="mt-1"
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
            />
          </div>

          <div className="mb-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              className="mt-1"
              id="firstname"
              name="firstname"
              type="text"
            />
          </div>

          <div className="mb-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input className="mt-1" id="lastname" name="lastname" type="text" />
          </div>

          <div>
            <Button className="mt-2" disabled={isLoading}>
              {isLoading && <Loader2 className="h4 w-4 animate-spin inline" />}
              Sign Up
            </Button>
          </div>
        </form>
        <p className="text-xs mt-4">
          Already have an account?{' '}
          <span>
            <Link className="text-yellow-500" href="/signin">
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
