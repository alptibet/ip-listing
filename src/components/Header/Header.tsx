import { UserButton } from '@clerk/nextjs';
import { ButtonLink, ButtonPrimary } from '../Buttons/Buttons';
import ProjectSwitcher from '../ProjectSwitcher/ProjectSwitcher';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import { auth } from '@clerk/nextjs/server';

export default function Header() {
  const { userId } = auth();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <ButtonLink label="HOME" url="/" />
        <ProjectSwitcher />
      </div>

      <div className="flex items-center gap-5">
        {!userId && (
          <>
            <ButtonPrimary label="Login" />
            <ButtonPrimary label="Signup" />
          </>
        )}
        <ThemeToggleButton />
        {userId && <UserButton afterSignOutUrl={'/'} />}
      </div>
    </div>
  );
}
