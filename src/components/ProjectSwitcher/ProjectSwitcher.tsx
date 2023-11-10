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
import DeleteProjectAlert from '../DeteleProjectAlert/DeleteProjectAlert';
// import { toast } from '../ui/use-toast';
import useSWR from 'swr';
import {
  getProjects,
  addProject,
  deleteProject,
  projectsUrlEndpoint as cacheKey,
} from '../../app/api/projectApi';
import {
  addProjectOptions,
  deleteProjectOptions,
} from '../../app/api/projectSWROptions';
import { toast } from '../ui/use-toast';

export default function ProjectSwitcher() {
  const [showPopover, setShowPopover] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState('');

  const router = useRouter();
  const params = useParams();
  const projectName = params.name?.toString().toUpperCase();

  function handleRoute(path: string) {
    router.push(path);
  }

  const {
    isLoading,
    error,
    data: projects,
    mutate,
  } = useSWR(cacheKey, getProjects);

  const handleNewProject = async function () {
    try {
      await mutate(addProject(newProject), addProjectOptions(newProject));
      toast({
        description: 'Project created.',
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
    } finally {
      setShowNewProjectDialog(false);
      router.push(`/dashboard/${newProject}`);
    }
  };

  const handleDeleteProject = async function () {
    try {
      await mutate(
        deleteProject(projectName),
        deleteProjectOptions(projectName)
      );
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
    } finally {
      setShowPopover(false);
    }
  };

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
                {isLoading && <p>Loading Projects</p>}
                {error && <p>Error loading projects</p>}
                {!isLoading &&
                  !error &&
                  projects.map((project: { id: string; name: string }) => {
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
                  })}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <>
                    <CommandItem
                      onSelect={() => {
                        setShowPopover(false);
                        setShowNewProjectDialog(true);
                      }}
                    >
                      <PlusCircledIcon className="mr-2" />
                      Add Project
                    </CommandItem>
                    <CommandItem>
                      <DeleteProjectAlert deleteHandler={handleDeleteProject} />
                      Delete selected project
                    </CommandItem>
                  </>
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
            value={newProject}
            onChange={(e) => {
              setNewProject(e.target.value.toUpperCase());
            }}
          />
        </div>
        <DialogFooter className="mr-auto flex items-center justify-between">
          <div className="flex gap-2">
            <Button onClick={handleNewProject}>Submit</Button>
            <Button
              variant="destructive"
              onClick={() => setShowNewProjectDialog(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
