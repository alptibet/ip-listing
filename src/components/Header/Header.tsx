import { UserButton } from '@clerk/nextjs';
import { ButtonLink, ButtonPrimary } from '../Buttons/Buttons';
import ProjectSwitcher from '../ProjectSwitcher/ProjectSwitcher';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <ButtonLink label="HOME" url="/" />
        <ProjectSwitcher />
      </div>

      <div className="flex items-center gap-5">
        <ButtonPrimary label="Login" />
        <ButtonPrimary label="Signup" />
        <ThemeToggleButton />
        <UserButton afterSignOutUrl={'/'} />
      </div>
    </div>
  );
}
