'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';

export default function TestPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const [project, setProject] = useState();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/${name.toUpperCase()}`
        );
        const project = await response.json();
        setProject(project);
      } catch (error) {
        throw new Error('There was an error fetching projects');
      }
    }
    fetchProjects();
  }, [name]);

  if (!project) {
    return <div>LOADING PROJECT</div>;
  }

  return (
    <div className="mx-2 my-2">
      <DataTable project={project} />
    </div>
  );
}
