import axios from 'axios';

const devicesApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export const devicesUrlEndpoint = '/api/projects';

export const getDevices = async (params) => {
  const projectName = params[1];
  const response = await devicesApi.get(`${devicesUrlEndpoint}/${projectName}`);
  return response.data;
};

export const addDevice = async (device) => {
  const response = await devicesApi.post(devicesUrlEndpoint, {
    data: device,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
