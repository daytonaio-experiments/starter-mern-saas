import { atom } from 'recoil';
import initialData from '../data/userDummyData';

export const userData = atom({
    key: 'userData',
    default: initialData, 
});

export const filteredUserData = atom({
    key: 'filteredUserData',
    default: initialData, 
});

export const currentEmployeeState = atom({
    key : 'currentEmployeeState',
    default : initialData[0],
})

export const showModalState = atom({
  key : 'showModalState',
  default : false,
})