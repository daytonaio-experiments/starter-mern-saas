import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { currentEmployeeState } from "../../state";
import { FaCheckCircle } from 'react-icons/fa';
import clientStatusData from '../../../data/clientStatusData'
import axios from 'axios';
const ClientStatus = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [clientStatusList, setClientStatusList] = useState(clientStatusData);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useRecoilState(currentEmployeeState)
  useEffect(()=>{
    setOpen(false);
  },[currentEmployee]);
  const handleClientStatusChange = async (newStatus) => {
    try {
      const updatedEmployee = { ...currentEmployee, customerStatus: newStatus };
      if(currentEmployee._id.length <= 5) {
        setCurrentEmployee(updatedEmployee);
        return;
      }
      const response = await axios.patch(`${BASE_URL}${updatedEmployee._id}`, updatedEmployee);
      if(response.status == 200){
        setCurrentEmployee(updatedEmployee);
        console.log("Customer status updated successfully");
      }
      else 
        console.error("Failed to update customer status", error);
    } catch (error) {
      console.error("Failed to update customer status", error);
    }
  };

  return (
    <div className="w-1/4 font-medium pr-8">
      <div className="text-3xl font-bold my-6">
        Client Status
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-[#151515] p-2 flex items-center justify-between border-solid rounded-lg border-2 border-[#2ECC71] text-white`}
      >
        {currentEmployee.customerStatus}
        <TiArrowSortedDown size={20} className={`${open && "rotate-180"} text-[#2ECC71]`} />
      </div>
      <div
        className={`bg-[#151515]  mt-2 overflow-y-auto ${
          open ? "max-h-60" : "hidden"
        } border-solid rounded-lg border-2 border-[#2ECC71] `}
      >
        <div className="flex items-center px-2 bg-[#090909] ">
          <AiOutlineSearch size={18} className="text-white" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Search Client Status"
            className="text-white p-2 outline-none bg-[#090909] w-full "
          />
        </div>

        <div className="bg-[#090909] "> 
          {clientStatusList?.map((clientStatus) => {
            return (
              <div key={clientStatus}
              className={` flex flex-row justify-between items-center p-2 text-md font-light hover:font-medium pl-4 py-2 cursor-pointer shadow-thin-border
                ${
                  clientStatus?.toLowerCase() === currentEmployee.customerStatus.toLowerCase() &&
                  "font-medium"
                }
                ${
                  clientStatus?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
                }`}
              onClick={() => {
                if (clientStatus?.toLowerCase() !== currentEmployee.customerStatus.toLowerCase()) {
                  console.log("alpha");
                  handleClientStatusChange(clientStatus);
                  console.log("beta");
                  setOpen(false);
                  setInputValue("");
                }
              }}>

              <div>
                {clientStatus}
              </div>
                <FaCheckCircle/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientStatus;
