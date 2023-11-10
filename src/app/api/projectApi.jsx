import axios from 'axios';

const projectApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const projectUrlEndpoint = '/projects';

export const getProjects = async () => {
  const response = await projectApi.get(todosUrlEndpoint);
  return response.data;
};

export const addProject = async ({ projectName }) => {
  const response = await projectApi.post(todosUrlEndpoint, {
    projectName,
  });
  return response.data;
};
