'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { Loader2 } from 'lucide-react';
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

export default function TestPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const [project, setProject] = useState();
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/${name.toUpperCase()}`
        );
        const project = await response.json();
        if (!response.ok || !project) {
          const errorResponse = await response.json();
          const error = errorResponse.message;
          setError(error);
        }
        console.log(project);
        setProject(project);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [name]);

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <AlertDialog open={error}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>An error occured.</AlertDialogTitle>
              <AlertDialogDescription>
                There was a problem with loading this project. You can either
                navigate to another project or try to reload this project.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setError(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setReload(true)}>
                Reload
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Loader2 className="h4 w-4 animate-spin inline" />
        <h2 className="inline ml-2">LOADING {name.toUpperCase()}...</h2>
      </div>
    );
  }

  if (!loading && !error) {
    return (
      <div className="mx-2 my-2">
        <DataTable project={project} />
      </div>
    );
  }
}
