import React from 'react';
import sample from '../../../src/assets/sample-profile.jpg';
import { currentEmployeeState, userData } from '../../state';
import { useRecoilState } from 'recoil';
import { FaTimes } from 'react-icons/fa';

import axios from 'axios';

const UserCard = ({ name, id, profilePicture }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [userList, setUserList] = useRecoilState(userData);
  const [currentEmployee, setCurrentEmployee] = useRecoilState(currentEmployeeState);

  const handleClick = () => {
    const user = userList.find(obj => obj._id === id);
    setCurrentEmployee(user);
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`${BASE_URL}${_id}`);
      console.log(response);
      if (response.status === 200) {
        const response2 = await axios.get(BASE_URL);
        if (response2.status === 200) {
          const updatedData = response2.data.customers.map((el) => ({
            ...el,
            contactDetails: {
              ...el.contactDetails,
              phone: el.contactDetails.phone.toString()
            }
          }));
          const prevdata = userList.filter((obj)=>{
            return obj._id.length <= 5;
          })
          const concatenatedData = [...prevdata, ...updatedData];
          setUserList(concatenatedData);
        } else {
          console.error('Error: Response data is not an array');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCancle = () => {
    if (id !== currentEmployee._id) {
      console.log(id);
      if (id.length <= 5) {
        const newUserList = userList.filter(obj => obj._id !== id);
        if (newUserList.length < userList.length) {
          setUserList(newUserList);
        }
      } else {
        handleDelete(id);
      }
    } else {
      alert("User selected for display cannot be deleted");
    }
  };

  return (
    <div className='relative'>
      <div
        className='flex items-center gap-5 w-full py-4 pl-7 cursor-pointer border-b-[1px] border-b-gray-400 hover:text-lg'
        onClick={handleClick}
      >
        <img src={profilePicture ? profilePicture : sample} alt="Profile" className='w-12 h-12 rounded-full' />
        <div className='flex flex-col'>
          <p className='font-bold'>{name}</p>
        </div>
      </div>
      <div
        className='absolute top-0 right-0 px-5 pb-1 pt-3 cursor-pointer hover:text-lg hover:text-[#2ECC71]'
        onClick={handleCancle}
      >
        <FaTimes />
      </div>
    </div>
  );
};

export default UserCard;
