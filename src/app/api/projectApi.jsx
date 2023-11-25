import axios from 'axios';

const projectsApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000',
});

export const projectsUrlEndpoint = '/api/projects';

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

export const deleteProject = async (name) => {
  console.log(name);
  const response = await projectsApi.delete(projectsUrlEndpoint, {
    data: name,
  });
  console.log(response);
  return response.data;
};
