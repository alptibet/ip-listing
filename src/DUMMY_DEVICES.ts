export type Device = {
  name: string;
  location: string;
  ipAddress: string;
  subnet: string;
  gateway: string;
  status: 'Assigned' | 'Not Assigned';
  system: string;
};

const DUMMY_DEVICES: Device[] = [
  {
    name: 'MTN222',
    location: 'SHAK2',
    ipAddress: '192.168.2.1',
    subnet: '255.255.255.0',
    gateway: '192.168.2.1',
    status: 'Assigned',
    system: 'KNX',
  },
  {
    name: 'ADV212',
    location: 'SHAK3',
    ipAddress: '192.168.2.2',
    subnet: '255.255.255.0',
    gateway: '192.168.2.1',
    status: 'Not Assigned',
    system: 'CCTV',
  },
];

export default DUMMY_DEVICES;
