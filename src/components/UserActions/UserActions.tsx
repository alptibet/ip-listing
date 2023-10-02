'use client';
import { ButtonLink, ButtonLogout } from '../Buttons/Buttons';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type UserPropTypes = {
  loggedInUser:
  | {
    firstName: string | null;
    lastName: string | null;
  }
  | undefined;
};

export default function UserActions({ loggedInUser }: UserPropTypes) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          {loggedInUser
            ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
            : 'User Actions'}
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
