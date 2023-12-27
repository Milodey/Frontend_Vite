// utils/fetchOptions.js
import statesData from '../data/states-and-districts.json';

export const fetchStates = () => statesData.map(state => state.state);

export const fetchDistricts = () => statesData.map(state => state.districts).flat();
export const receiveFromOptions = ['Select Receive From', 'UIDAI Regional Office, Bengaluru', 'UIDAI Regional Office, Chandigarh','UIDAI Regional Office, Pragati Maidan, New Delhi',
'UIDAI Regional Office, Guwahati','UIDAI Regional Office, Hyderabad','UIDAI Regional Office, Lucknow','UIDAI Regional Office, Mumbai','UIDAI Regional Office, Ranchi'];
export const sendToOptions = ['Select Send To', 'UIDAI Regional Office, Bengaluru', 'UIDAI Regional Office, Chandigarh','UIDAI Regional Office, Pragati Maidan, New Delhi', 'UIDAI Regional Office, Guwahati','UIDAI Regional Office, Hyderabad','UIDAI Regional Office, Lucknow','UIDAI Regional Office, Mumbai','UIDAI Regional Office, Ranchi' ];
