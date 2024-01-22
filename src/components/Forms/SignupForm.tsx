'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newUserSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please provide a valid email' })
    .min(1, { message: 'Email is required' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' }),
  password: z.string().min(8, { message: 'Password too short' }),
  firstName: z.string().min(3, { message: 'First name is required' }),
  lastName: z.string().min(3, { message: 'Last name is required' }),
});

type NewUserSchemaType = z.infer<typeof newUserSchema>;

const usersApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000',
});

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserSchemaType>({ resolver: zodResolver(newUserSchema) });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<NewUserSchemaType> = async function (data) {
    try {
      setIsLoading(true);
      await usersApi.post('api/auth/signup', data);
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.response.data.detail}`,
        duration: 3000,
        variant: 'destructive',
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register('username')}
              className="mt-1"
              id="username"
              type="text"
            />
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="mb-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register('password')}
              className="mt-1"
              id="password"
              type="password"
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              className="mt-1"
              id="email"
              placeholder="name@example.com"
              type="email"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              {...register('firstName')}
              className="mt-1"
              id="firstname"
              type="text"
            />
            {errors.firstName && (
              <span className="text-xs text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="mb-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              {...register('lastName')}
              className="mt-1"
              id="lastname"
              type="text"
            />
            {errors.lastName && (
              <span className="text-xs text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div>
            <Button type="submit" className="mt-2" disabled={isLoading}>
              {isLoading && <Loader2 className="h4 w-4 animate-spin inline" />}
              Sign Up
            </Button>
          </div>
        </form>
        <p className="text-xs mt-4">
          Already have an account?
          <span className="ml-2">
            <Link className="text-yellow-500" href="/signin">
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
