import { useRecoilState } from 'recoil';
import { showModalState } from '../../state';
import UserForm from './NewUserForm';

export const NewUser = () => {
    const [showModal, setShowModal] = useRecoilState(showModalState);

    const handleOpenModal = () => {
      setShowModal(true);
    };
    return (
      <div>
        <button 
          className="bg-[#151515] text-white px-4 py-2 rounded-md w-full text-center"
          onClick={handleOpenModal}
        >
          Create New User
        </button>
        <UserForm/>
      </div>
    );
};

export default NewUser;