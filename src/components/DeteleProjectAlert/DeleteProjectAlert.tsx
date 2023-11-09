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

type propTypes = {
  projectName: string;
  handleDelete: Function;
};

export default function DeleteProjectAlert({
  projectName,
  handleDelete,
}: propTypes) {
  const router = useRouter();
  const handleDeleteProject = async function (projectName: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/`, {
        method: 'DELETE',
        body: JSON.stringify(projectName),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        const error = errorResponse.message;
        toast({
          title: 'Error',
          description: `${error}`,
          duration: 3000,
          variant: 'destructive',
        });
      }
      toast({
        description: 'Project deleted.',
        duration: 3000,
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
      throw new Error('There was an error deleting project');
    } finally {
      handleDelete();
    }
  };

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
