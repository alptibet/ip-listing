import axios from 'axios';

const projectsApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export const projectsUrlEndpoint = '/api/projects';

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

export const getDevices = async (params) => {
  const projectName = params[1];
  const response = await projectsApi.get(
    `${projectsUrlEndpoint}/${projectName}`
  );
  return response.data;
};

export const addDevice = async (device) => {
  const response = await projectsApi.post(projectsUrlEndpoint, {
    data: device,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
