'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { Skeleton } from '../ui/skeleton';

type Project = {
  id: string;
  name: string;
};

type NewProject = {
  name: string;
};

export default function ProjectSwitcher() {
  const [showPopover, setShowPopover] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([{ id: '', name: '' }]);
  const [newProject, setNewProject] = useState<NewProject>({ name: '' });
  const [isEditedProjects, setIsEditedProjects] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const params = useParams();
  const projectName = params.name.toString().toUpperCase();

  function handleRoute(path: string) {
    router.push(path);
  }

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/projects');
        const projects = await response.json();
        setProjects(projects);
      } catch (error) {
        throw new Error('There was an error fetching projects');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, [isEditedProjects]);

  async function addProject() {
    setIsEditedProjects(true);
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        const error = errorResponse.message;
        setError(error);
      }
    } catch (error) {
      throw new Error('There was an error creating project');
    } finally {
      setIsEditedProjects(false);
    }
  }

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
            {params.name ? projectName : 'Select project'}
            <CaretSortIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandList>
              <CommandInput placeholder="Search project..." />
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup heading="Projects">
                {projects.map((project) => {
                  if (!isLoading) {
                    return (
                      <CommandItem
                        key={project.id}
                        className="text-sm flex items-center justify-between"
                        onSelect={() => {
                          setShowPopover(false);
                          handleRoute(
                            `/dashboard/${project.name.toLowerCase()}`
                          );
                        }}
                      >
                        {project.name}
                        <CheckIcon
                          className={cn(
                            projectName === project.name
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    );
                  } else {
                    return (
                      <Skeleton
                        key={project.id}
                        className="w-[100px] h-[20px] rounded-full"
                      />
                    );
                  }
                })}
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
          <Input
            id="name"
            placeholder="Project name"
            value={newProject.name}
            onChange={(e) => {
              setNewProject({ name: e.target.value.toUpperCase() });
            }}
          />
        </div>
        <DialogFooter className="mr-auto flex items-center justify-between">
          <div className="flex gap-2">
            <Button onClick={addProject}>Submit</Button>
            <Button
              variant="destructive"
              onClick={() => setShowNewProjectDialog(false)}
            >
              Cancel
            </Button>
          </div>
          {error && (
            <div>
              <p className="text-xs text-red-500">{error}</p>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
