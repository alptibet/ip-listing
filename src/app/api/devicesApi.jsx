import axios from 'axios';

const devicesApi = axios.create({
  baseURL: window.location.protocol + '//' + window.location.hostname,
});

export const devicesUrlEndpoint = '/api/projects';

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
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const deleteDevice = async (params) => {
  const projectName = params[1];
  const devices = params[0];
  const response = await devicesApi.delete(
    `${devicesUrlEndpoint}/${projectName}`,
    {
      data: devices,
      headers: {
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
