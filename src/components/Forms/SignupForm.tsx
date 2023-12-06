'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

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
        <Input id="username" type="text" />

        <Label className="" htmlFor="password">
          Password
        </Label>
        <Input id="password" type="password" />

        <Label className="" htmlFor="email">
          Email
        </Label>
        <Input id="email" placeholder="name@example.com" type="email" />

        <Label className="" htmlFor="firstname">
          First Name
        </Label>
        <Input id="firstname" type="text" />

        <Label className="" htmlFor="lastname">
          Last Name
        </Label>
        <Input id="lastname" type="text" />

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
