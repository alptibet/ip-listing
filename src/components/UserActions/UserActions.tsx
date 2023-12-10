'use client';
import { CaretSortIcon, PersonIcon } from '@radix-ui/react-icons';
import { ButtonLink } from '../Buttons/Buttons';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

type UserPropTypes = {
  loggedInUser:
    | {
        firstName: string | null;
        lastName: string | null;
      }
    | undefined;
};

const callbackUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_URL
    : 'http://localhost:3000';

const handleSignout = async function () {
  await signOut({ callbackUrl: callbackUrl });
};

export default function UserActions({ loggedInUser }: UserPropTypes) {
  const [showUserActions, setShowUserActions] = useState(false);
  return (
    <Popover open={showUserActions} onOpenChange={setShowUserActions}>
      <PopoverTrigger asChild>
        <Button className="font-bold flex items-center gap-2">
          <PersonIcon />
          {loggedInUser
            ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
            : 'Login/Signup'}
          <CaretSortIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-auto">
        {!loggedInUser && (
          <>
            <ButtonLink label="Login" url="/signin" />
            <ButtonLink label="Signup" url="/signup" />
          </>
        )}
        {loggedInUser && (
          <Button onClick={handleSignout} variant="destructive">
            Logout
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
