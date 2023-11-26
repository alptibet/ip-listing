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

import { CrossCircledIcon } from '@radix-ui/react-icons';

type DeleteProjectAlertTypes = {
  deleteHandler: React.MouseEventHandler<HTMLButtonElement>;
};

export default function DeleteProjectAlert({
  deleteHandler,
}: DeleteProjectAlertTypes) {
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
            <AlertDialogAction onClick={deleteHandler}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
