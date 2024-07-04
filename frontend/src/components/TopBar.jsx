import logo from '../../src/assets/logo.png'

const  TopBar = () => {
    return <div className={'flex fles-row items-center ml-10 mb-4'}>
        <img src={logo} alt="No img" className=' w-10 h-10 rounded-full my-4' />
        <div className={'text-2xl ml-2 font-bold border-solid border-r-4 border-r-white pr-3 '}>Daytona</div>
        <div className={'text-2xl pl-3 font-light'}>Creator Relationship Management</div>
    </div>
}

export default  TopBar;