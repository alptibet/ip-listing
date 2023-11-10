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

export const deleteProjectOptions = (id) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (projects) => {
      return projects.filter((project) => {
        return project.id !== id;
      });
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (emptyResponseObj, projects) => {
      return projects.filter((project) => {
        return project.id !== id;
      });
    },
    revalidate: false,
  };
};
