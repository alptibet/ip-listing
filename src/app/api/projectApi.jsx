import axios from 'axios';

const projectsApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const devicesApi = axios.create({
  baseURL: 'http://localhost:3000/api/projects',
});

export const projectsUrlEndpoint = '/projects';
export const devicesUrlEndpoint = '/';

export const getProjects = async () => {
  const response = await projectsApi.get(projectsUrlEndpoint);
  return response.data;
};

export const addProject = async (name) => {
  const response = await projectsApi.post(projectsUrlEndpoint, {
    name,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteProject = async (name) => {
  const response = await projectsApi.delete(projectsUrlEndpoint, {
    data: name,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getDevices = async () => {
  const response = await devicesApi.get(devicesUrlEndpoint);
  return response.data;
};
