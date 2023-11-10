import axios from 'axios';

const projectsApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const projectsUrlEndpoint = '/projects';

export const getProjects = async () => {
  const response = await projectsApi.get(projectsUrlEndpoint);
  return response.data;
};

export const addProject = async ({ project }) => {
  const response = await projectsApi.post(projectsUrlEndpoint, {
    project,
  });
  return response.data;
};
