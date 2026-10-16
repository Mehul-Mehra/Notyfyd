import { useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router' 
import toast, { LoaderIcon } from 'react-hot-toast'
import { ChevronLeftIcon, UserCircle2Icon } from 'lucide-react'

import api from '../lib/axios.js'
import { useAuth } from '../context/AuthContext.jsx'
import LiveNoteEditor from '../components/LiveNoteEditor.jsx'

const LiveEditPage = () => {
    const [liveNote, setLiveNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth(); 

    useEffect(() => {
        const fetchLiveNote = async () => {
            try{
                const res = await api.get(`/liveNotes/${id}`,{
                    withCredentials: true
                });
                setLiveNote(res.data);
                console.log(liveNote);
            }
            catch(error){
                console.log('Error fetching live note',error);
                toast.error('Failed to fetch live note');
                navigate('/live-notes');
            }
            finally{
                setLoading(false);
            }
        }
        fetchLiveNote();
    },[]);

    return (
        <>  
            {loading && 
                <div className='w-screen h-screen flex items-center justify-center gap-3'><LoaderIcon className='scale-200'/>Loading</div>
            }
            {!loading && <>
                <header className="w-screen h-[7vh] bg-secondary-content flex justify-between items-center">
                    <NavLink to={'/live-notes'} className="btn ml-2"><ChevronLeftIcon/></NavLink>
                    <div className='text-2xl'>{liveNote.title}</div>
                    <div className='bg-neutral text-accent-content p-1.5 mr-3 flex items-center border rounded-lg'><UserCircle2Icon className='text-blue-50 m-0.5' /> Hello, {user.username}</div>
                </header>
                <main className="w-screen h-[93vh]">
                    <LiveNoteEditor user={user} liveNote={liveNote}/>
                </main>
            </>
            }
        </>
    )
}

export default LiveEditPage