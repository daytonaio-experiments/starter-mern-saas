import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { showModalState, userData } from '../../state';
import axios from 'axios';


const UserForm = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [newUser, setNewUser] = useState({});
  const [userList, setUserList] = useRecoilState(userData);
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const [base64String, setBase64String] = useState({});
  const checkNewUser = (newUser) => {
    if (!newUser || !newUser.name || newUser.name.length === 0) {
      alert("please fill all the feilds");
      return false;
    }
    if (!newUser.designation || newUser.designation.length === 0) {
      alert("please fill all the feilds");
      return false;
    }
    if (!newUser.profiles || !newUser.profiles.github || newUser.profiles.github.length === 0) {
      alert("please fill all the feilds");
      return false;
    }
    if (!newUser.profiles || !newUser.profiles.linkedIn || newUser.profiles.linkedIn.length === 0) {
      alert("please fill all the feilds");
      return false;
    }
    if (!newUser.bio || newUser.bio.length === 0) {
      alert("please fill all the feilds");
      return false;
    }
    if (!newUser.contactDetails || !newUser.contactDetails.email || newUser.contactDetails.email.length === 0) {
      alert("please fill all the feilds");
      return false;
    }
    if (!newUser.contactDetails || !newUser.contactDetails.phone) {
      alert("please fill all the feilds");
      return false;
    }
    if (!newUser.customerStatus || newUser.customerStatus.length === 0) {
      alert("please fill all the feilds");
      return false;
    }
    if (!newUser.projectStatus || newUser.projectStatus.length === 0) {
      alert("please fill all the feilds");
      return false;
    }
    return true;
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === 'modal-backdrop') {
        setShowModal(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  },[] );

  useEffect(() => {
    if (base64String.base64) {
      setNewUser({
        ...newUser,
        profilePicture: base64String.base64,
      });
    }
  }, [base64String, setNewUser]);

  if (!showModal) {
    return null;
  }

  function convert(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        res(reader.result);
      };
    });
  }

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convert(file);
    setBase64String({
      name: file.name,
      base64: base64,
    });
  };

  return (
    <div id="modal-backdrop" className=" fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-[#151515] p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4 my-8 border-solid border-[#2ECC71] border-[1px]">
        <h2 className="text-2xl mb-4">Create New User</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white">Name</label>
            <input
              onChange={(e) => {
                setNewUser({ ...newUser, name: e.target.value });
              }}
              type="text"
              className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-white">Designation</label>
            <input
              onChange={(e) => {
                setNewUser({ ...newUser, designation: e.target.value });
              }}
              type="text"
              className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="clientStatus" className="text-sm font-medium text-white">Client Status</label>
              <select
                id="clientStatus"
                onChange={(e) => {
                  setNewUser({ ...newUser, customerStatus: e.target.value });
                }}
                className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
                required
              >
                <option value="" disabled selected>Select Client Status</option>
                <option value="Work Agreement Signed">Work Agreement Signed</option>
                <option value="Deliverables Assigned">Deliverables Assigned</option>
                <option value="Deliverables Completed">Deliverables Completed</option>
                <option value="Payment Pending">Payment Pending</option>
                <option value="Payment Recieved">Payment Recieved</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="projectStatus" className="text-sm font-medium text-white">Project Status</label>
              <select
                id="projectStatus"
                onChange={(e) => {
                  setNewUser({ ...newUser, projectStatus: e.target.value });
                }}
                className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
                required
              >
                <option value="" disabled selected>Select Project Status</option>
                <option value="Project Assigned">Project Assigned</option>
                <option value="In review client side">In review client side</option>
                <option value="In review vendor side">In review vendor side</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-white">Email</label>
              <input
                onChange={(e) => {
                  setNewUser({ ...newUser, contactDetails:{...newUser.contactDetails, email: e.target.value }});
                }}
                type="email"
                className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-white">Phone Number</label>
              <input
                onChange={(e) => {
                  setNewUser({ ...newUser, contactDetails:{...newUser.contactDetails, phone: e.target.value }});
                }}
                type="tel"
                className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-white">GitHub Link</label>
              <input
                onChange={(e) => {
                  setNewUser({ ...newUser, profiles:{...newUser.profiles, github: e.target.value }});
                }}
                type="url"
                className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-white">LinkedIn Link</label>
              <input
                onChange={(e) => {
                  setNewUser({ ...newUser, profiles:{...newUser.profiles, linkedIn: e.target.value }});
                }}
                type="url"
                className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-white">Bio</label>
            <textarea
              onChange={(e) => {
                setNewUser({ ...newUser, bio: e.target.value });
              }}
              className="mt-1 w-full bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-0.5 rounded-lg"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label htmlFor="file-upload" className="cursor-pointer text-sm font-medium text-white bg-[#090909] border-solid border-[#2ECC71] border-[1px] px-3 mr-2 py-2 rounded-lg">
              {base64String.name ? base64String.name : "Upload Profile Picture"}
            </label>
            <input
              required
              onChange={handleFileInputChange}
              id="file-upload"
              type="file"
              className="hidden"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={async () => {
                if(checkNewUser(newUser) == false) return;
                console.log(newUser);
                setShowModal(false);
                const response = await axios.post(BASE_URL, newUser);
                console.log(response);
                if(response.status == 201){
                  try {
                    const response2 = await axios.get(BASE_URL);
                    if (response2.status === 200) {
                      const updatedData = response2.data.customers.map((el) => {
                        return {
                          ...el,
                          contactDetails: {
                            ...el.contactDetails,
                            phone: el.contactDetails.phone.toString()
                          }
                        };
                      });
                      const prevdata = userList.filter((obj)=>{
                        return obj._id.length <= 5;
                      })
                      const concatenatedData = [...prevdata, ...updatedData];
                      setUserList(concatenatedData);
                    } else {
                      console.error('Error: Response data is not an array');
                    }
                  }catch (error) {
                    console.error('Error fetching data:', error);
                  }
                }else{
                  console.log("error creating new user");
                }
                console.log(newUser);
                setNewUser({})
                setBase64String({});
              }}
              required
              className="bg-[#151515] text-white px-4 py-2 border-solid border-[#2ECC71] border-[1px] rounded-lg"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-[#151515] text-white px-4 py-2 border-solid border-[#2ECC71] border-[1px] rounded-lg"
              onClick={()=>{setShowModal(false)}}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
