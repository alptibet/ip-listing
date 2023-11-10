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
