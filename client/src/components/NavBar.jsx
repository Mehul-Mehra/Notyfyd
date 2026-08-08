import { HomeIcon, PencilIcon } from 'lucide-react'
import { NavLink } from 'react-router'

const NavBar = () => {
    return (
        <header>
            <div className='h-[14vh] w-screen flex bg-emerald-600 shadow-2xl rounded-b-2xl flex-col'>
                <div className='w-screen text-[5vh] flex justify-center text-accent-content'>SynLabs</div>
                <div className='w-screen flex justify-evenly'>
                    <NavLink to={'/'} className={({isActive})=>`btn border-0 ${isActive?'text-neutral bg-accent-content':'bg-neutral text-accent-content'}`}><HomeIcon className='size-6'/> Home</NavLink>
                    <NavLink to={'/create'} className={({isActive})=>`btn border-0 ${isActive?'text-neutral bg-accent-content':'bg-neutral text-accent-content'}`}><PencilIcon className='size-5'/> Create Note</NavLink>
                </div>
            </div>
        </header>
    )
}

export default NavBar