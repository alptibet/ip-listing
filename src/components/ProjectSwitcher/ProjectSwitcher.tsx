'use client';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  CaretSortIcon,
  PlusCircledIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from '../ui/dialog';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function ProjectSwitcher() {
  const [showPopover, setShowPopover] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  return (
    <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
      <Popover open={showPopover} onOpenChange={setShowPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={showPopover}
            aria-label="Search project"
            className="font-semibold"
          >
            {selectedProject ? selectedProject : 'Select project'}
            <CaretSortIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandList>
              <CommandInput placeholder="Search project..." />
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup heading="Projects">
                {DUMMY_DATA.projects.map((project) => (
                  <CommandItem
                    className="text-sm"
                    key={project.id}
                    onSelect={() => {
                      setSelectedProject(project.name);
                      setShowPopover(false);
                    }}
                  >
                    {project.name}
                    <CheckIcon //will later change according to real data
                      className={cn(
                        selectedProject === project.name
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setShowPopover(false);
                      setShowNewProjectDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2" />
                    Add Project
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Add a new project to manage ip list.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input id="name" placeholder="Project name" />
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => setShowNewProjectDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const DUMMY_DATA = {
  projects: [
    {
      id: 1,
      name: 'Radisson',
    },
    {
      id: 2,
      name: 'OVC',
    },
    {
      id: 3,
      name: 'REKA2',
    },
  ],
};
