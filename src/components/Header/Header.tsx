import ProjectSwitcher from '../ProjectSwitcher/ProjectSwitcher';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import UserActions from '../UserActions/UserActions';

export default async function Header() {
  const user = { firstName: 'Alp', lastName: 'Tibet' };
  let loggedInUser;
  if (user) {
    loggedInUser = {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  return (
    <div className="flex items-center justify-between mx-2 my-2">
      <div className="flex items-center gap-5">
        <h2>Projects</h2>
        {user && <ProjectSwitcher />}
      </div>

      <div className="flex items-center gap-5">
        <ThemeToggleButton />
        <UserActions loggedInUser={loggedInUser} />
      </div>
    </div>
  );
}
