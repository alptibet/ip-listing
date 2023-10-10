import AddDeviceForm from '../AddDeviceForm/AddDeviceForm';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export default function AddDevice() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Device</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Device</DialogTitle>
          <DialogDescription>Add deneme</DialogDescription>
        </DialogHeader>
        <AddDeviceForm />
      </DialogContent>
    </Dialog>
  );
}
