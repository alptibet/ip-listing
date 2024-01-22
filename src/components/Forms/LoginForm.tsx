'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginSchemaType> = async function (data) {
    try {
      setIsLoading(true);
      const response = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (!response?.error) {
        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 5000,
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
          <h1 className="font-bold text-base">Login</h1>
          <p className="text-sm">Enter credentials to login</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label className="" htmlFor="username">
              Username
            </Label>
            <Input {...register('username')} id="username" type="text" />
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="mb-2">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input {...register('password')} id="password" type="password" />
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex justify-between">
            <Button type="submit" className="mt-2" disabled={isLoading}>
              {isLoading && <Loader2 className="h4 w-4 animate-spin inline" />}
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
