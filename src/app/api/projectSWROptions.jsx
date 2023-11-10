export const addProjectOptions = (newProject) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (projects) => [...projects, newProject],
    rollbackOnError: true,
    populateCache: (added, projects) => [...projects, added],
    revalidate: false,
  };
};
