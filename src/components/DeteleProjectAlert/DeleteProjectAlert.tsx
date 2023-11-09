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
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { CrossCircledIcon } from '@radix-ui/react-icons';

type propTypes = {
  projectName: string;
};

export default function DeleteProjectAlert({ projectName }: propTypes) {
  const handleDeleteProject = async function (projectName: string) {
    console.log(projectName);
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
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
      throw new Error('There was an error deleting project');
    }
  };

  return (
    <div className="mr-auto">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            <CrossCircledIcon className="mr-2 ml-[-16px]" color="red" />
            Delete selected project
          </Button>
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
