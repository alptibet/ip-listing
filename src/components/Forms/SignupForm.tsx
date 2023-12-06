'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  };

  return (
    <div className="flex flex-col items-center max-h-screen">
      <div className="mb-2">
        <h1 className="font-bold text-base">Create an account</h1>
        <p className="text-sm">Fill the form to create your account</p>
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

        <Label className="" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="name@example.com"
          type="email"
        />

        <Label className="" htmlFor="firstname">
          First Name
        </Label>
        <Input id="firstname" name="firstname" type="text" />

        <Label className="" htmlFor="lastname">
          Last Name
        </Label>
        <Input id="lastname" name="lastname" type="text" />

        <div className="flex justify-between">
          <Button className="mt-2" disabled={isLoading}>
            {isLoading && <Loader2 className="h4 w-4 animate-spin inline" />}
            Sign Up
          </Button>
          <Button className="mt-2" disabled={isLoading} variant="destructive">
            {isLoading && <Loader2 className="h4 w-4 animate-spin inline" />}
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
