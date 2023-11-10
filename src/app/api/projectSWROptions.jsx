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

export const deleteProjectOptions = (name) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (projects) => {
      return projects.filter((project) => {
        return project.name !== name;
      });
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (emptyResponseObj, projects) => {
      return projects.filter((project) => {
        return project.name !== name;
      });
    },
    revalidate: false,
  };
};

export const addDeviceOptions = (newDevice) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (devices) => [...devices, newDevice],
    rollbackOnError: true,
    populateCache: (added, devices) => [...devices, added],
    revalidate: false,
  };
};
