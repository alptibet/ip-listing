import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '../ui/use-toast';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import {
  deleteProject,
  projectsUrlEndpoint as cacheKey,
} from '../../app/api/projectApi';
import { deleteProjectOptions } from '../../app/api/projectSWROptions';

type propTypes = {
  projectName: string;
  handleDelete: Function;
};

export default function DeleteProjectAlert({
  projectName,
  handleDelete,
}: propTypes) {
  const router = useRouter();

  const { error, mutate } = useSWR(cacheKey, deleteProject);
  const handleDeleteProject = async function (projectName: string) {
    console.log(projectName);
    try {
      await mutate(
        deleteProject(projectName),
        deleteProjectOptions(projectName)
      );
      router.push('/dashoard');
    } catch (err) {
      //toast here
      console.log(err);
    } finally {
      handleDelete();
    }
  };
  console.log(error);
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <CrossCircledIcon className="mr-2 h-4 w-4" color="red" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is no reversable.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteProject(projectName)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
