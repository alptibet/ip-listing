import ProjectSwitcher from '../ProjectSwitcher/ProjectSwitcher';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import UserActions from '../UserActions/UserActions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  let loggedInUser;
  if (user) {
    loggedInUser = {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  const canEditProjects = user?.userRole !== 'user';

  return (
    <div className="flex items-center justify-between mx-2 my-2">
      <div className="flex items-center gap-5">
        {user?.isActive && (
          <>
            <h2>Projects</h2>
            <ProjectSwitcher canEditProjects={canEditProjects} />
          </>
        )}
      </div>

      <div className="flex items-center gap-5">
        <ThemeToggleButton />
        <UserActions loggedInUser={loggedInUser} />
      </div>
    </div>
  );
}
