import { useRecoilState } from 'recoil';
import { userData, filteredUserData } from '../state';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const  SearchBar = () => {
    const [userList, setUserList] = useRecoilState(userData);
    const [filteredData, setFilteredData] = useRecoilState(filteredUserData);
    const [search, setSearch] = useState("");
    useEffect(()=>{
        if (userList) {
            setFilteredData(
                userList.filter(emp => {
                    const lowerCaseName = emp.name.toLowerCase();
                    const lowerCaseSearch = search.toLowerCase();
                    return lowerCaseName.startsWith(lowerCaseSearch);
                })
            );
        }
    }, [search, userList])
    return ( 
    <div className='flex flex-row items-center  px-7 '>
        <input
            className='w-72 pl-2 bg-[#151515] border-solid border-b-[1px] border-b-gray-400'
            type="text"
            placeholder='Search'
            onChange={(e) => { setSearch(e.target.value) }}
        />
        <div className='bg-[#151515] h-full py-1 pr-1 text-whitw-600 border-solid border-b-[1px] border-b-gray-400'>
        <FiSearch/>
        </div>
    </div>);
}

export default SearchBar;
