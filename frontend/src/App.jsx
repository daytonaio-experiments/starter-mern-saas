import './App.css'
import  UserProfile  from './components/user/UserProfile';
import TopBar from './components/TopBar'
import  UserDesc  from './components/user/UserDesc';
import SideBar from './components/SideBar'

function App() {
  return (
    <div className="grid grid-cols-5 text-white bg-[#090909] main-content">
      <div className=" col-span-4 flex flex-col">
        <TopBar />
        <UserProfile/>
        <UserDesc />
      </div>
      <div className="col-span-1 bg-[#151515] sticky top-0 h-screen overflow-y-auto">
        <SideBar />
      </div>
    </div>
  );
}

export default App
