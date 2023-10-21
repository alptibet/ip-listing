'use client';
import useSWR from 'swr';
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

type Project = {
  id: string;
  name: string;
};

const initialProject: Project = {
  id: '',
  name: 'Select project',
};

const deneme = async function() {
  try {
    const data = await fetch('api/projects');
    const res = await data.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const ttt = deneme();
console.log(ttt);

export default function ProjectSwitcher() {
  const [showPopover, setShowPopover] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<Project>(initialProject);

  return (
    <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
      <Popover open={showPopover} onOpenChange={setShowPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={showPopover}
            aria-label="Search project"
            className="font-semibold w-[200px] justify-between"
          >
            {selectedProject.name ? selectedProject.name : 'Select project'}
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
                    className="text-sm flex items-center justify-between"
                    key={project.id}
                    onSelect={() => {
                      setSelectedProject(project);
                      setShowPopover(false);
                    }}
                  >
                    {project.name}
                    <CheckIcon //will later change according to real data
                      className={cn(
                        selectedProject.name === project.name
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
            Add a new project to manage device ip addresses
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
//DELETE DUMMY DATA later
const DUMMY_DATA = {
  projects: [
    {
      id: 'a',
      name: 'Radisson',
    },
    {
      id: 'b',
      name: 'OVC',
    },
    {
      id: 'c',
      name: 'REKA2',
    },
  ],
};
