'use client';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ButtonLink, ButtonLogout } from '../Buttons/Buttons';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';

type UserPropTypes = {
  loggedInUser:
    | {
        firstName: string | null;
        lastName: string | null;
      }
    | undefined;
};

export default function UserActions({ loggedInUser }: UserPropTypes) {
  const [showUserActions, setShowUserActions] = useState(false);
  return (
    <Popover open={showUserActions} onOpenChange={setShowUserActions}>
      <PopoverTrigger asChild>
        <Button>
          {loggedInUser
            ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
            : 'User Actions'}
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
        {loggedInUser && <ButtonLogout label="Logout" />}
      </PopoverContent>
    </Popover>
  );
}
