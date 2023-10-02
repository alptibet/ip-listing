import { ButtonLink } from '../Buttons/Buttons';
import ProjectSwitcher from '../ProjectSwitcher/ProjectSwitcher';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import { currentUser } from '@clerk/nextjs/server';
import UserActions from '../UserActions/UserActions';
import Search from '../Search/Search';

export default async function Header() {
  const user = await currentUser();
  let loggedInUser;
  if (user) {
    loggedInUser = {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <ButtonLink label="HOME" url="/" />
        {user && <ProjectSwitcher />}
      </div>

      <div className="flex items-center gap-5">
        <Search />
        <ThemeToggleButton />
        <UserActions loggedInUser={loggedInUser} />
      </div>
    </div>
  );
}
