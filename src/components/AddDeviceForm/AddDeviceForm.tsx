'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const deviceFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Device name must be at least 3 characters.' })
    .max(12, { message: 'Device name cannot be longer than 12 characters.' }),
  description: z.string().max(40),
  ipAddress: z.string().ip({ message: 'Invalid ip address.' }),
  subnet: z.string().ip({ message: 'Invalid subnet.' }),
  gateway: z.string().ip({ message: 'Invalid gateway.' }),
  location: z.string(),
  status: z.enum(['Assigned', 'Not Assigned']),
  system: z
    .string()
    .min(2, { message: 'System name must be at least 3 characters.' })
    .max(8, { message: 'System name cannot be longer than 8 characters.' }),
});

export default function AddDeviceForm() {
  const form = useForm<z.infer<typeof deviceFormSchema>>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: { status: 'Not Assigned' },
  });

  const errors = form.formState.errors;

  function onSubmit(values: z.infer<typeof deviceFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors?.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors?.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ipAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors?.ipAddress && (
                <p className="text-red-500 text-xs">
                  {errors.ipAddress.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subnet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subnet Mask</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors?.subnet && (
                <p className="text-red-500 text-xs">{errors.subnet.message}</p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gateway"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gateway</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors?.gateway && (
                <p className="text-red-500 text-xs">{errors.gateway.message}</p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors?.location && (
                <p className="text-red-500 text-xs">
                  {errors.location.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Not Assigned" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Not Assigned">Not Assigned</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="system"
          render={({ field }) => (
            <FormItem>
              <FormLabel>System</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors?.system && (
                <p className="text-red-500 text-xs">{errors.system.message}</p>
              )}
            </FormItem>
          )}
        />
        <div className="mt-4 flex gap-2 ml-auto">
          <Button type="button" variant="destructive">
            Cancel
          </Button>
          <Button type="submit">Add Device</Button>
        </div>
      </form>
    </Form>
  );
}
