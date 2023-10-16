type Device = {
  name: string;
  location: string;
  ipAddress: string;
  subnet: string;
  gateway: string;
  status: 'Assigned' | 'Not Assigned';
  system: string;
};
let DUMMY_DEVICES: Device[] = [
  {
    name: 'ADV212',
    location: 'SHAK3',
    ipAddress: '192.168.2.2',
    subnet: '255.255.255.0',
    gateway: '192.168.2.1',
    status: 'Not Assigned',
    system: 'CCTV',
  },
  {
    name: 'SNS88',
    location: 'SHAK4',
    ipAddress: '192.168.2.3',
    subnet: '255.255.255.0',
    gateway: '192.168.2.1',
    status: 'Not Assigned',
    system: 'HVAC',
  },
  {
    name: 'ZART',
    location: 'SHAK5',
    ipAddress: '192.168.2.4',
    subnet: '255.255.255.0',
    gateway: '192.168.2.1',
    status: 'Assigned',
    system: 'KNX',
  },
];

export default DUMMY_DEVICES;