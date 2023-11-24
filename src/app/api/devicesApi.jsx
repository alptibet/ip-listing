import axios from 'axios';

const devicesApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000',
});

export const devicesUrlEndpoint = '/api/projects';
export const allDevicesEndpoint = '/api/devices';

export const getAllDevices = async () => {
  const response = await devicesApi.get(allDevicesEndpoint);
  return response.data;
};

export const getDevices = async (params) => {
  const projectName = params[1];
  const response = await devicesApi.get(`${devicesUrlEndpoint}/${projectName}`);
  return response.data;
};

export const addDevice = async (params) => {
  const projectName = params[1];
  const device = params[0];
  const response = await devicesApi.post(
    `${devicesUrlEndpoint}/${projectName}`,
    {
      device,
    }
  );
  return response.data[0];
};

export const deleteDevice = async (params) => {
  const projectName = params[1];
  const devices = params[0];
  const response = await devicesApi.delete(
    `${devicesUrlEndpoint}/${projectName}`,
    {
      data: devices,
    }
  );
  return response.data;
};

export const updateDevice = async (params) => {
  const projectName = params[1];
  const device = params[0];
  const response = await devicesApi.patch(
    `${devicesUrlEndpoint}/${projectName}`,
    {
      data: device,
    }
  );
  return response.data;
};
