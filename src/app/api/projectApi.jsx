import axios from 'axios';

const projectsApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const projectsUrlEndpoint = '/projects';

export const getProjects = async () => {
  const response = await projectsApi.get(projectsUrlEndpoint);
  return response.data;
};

export const addProject = async (name) => {
  const response = await projectsApi.post(projectsUrlEndpoint, {
    name,
  });
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await projectsApi.delete(projectsUrlEndpoint, {
    id,
  });
  return response.data;
};
