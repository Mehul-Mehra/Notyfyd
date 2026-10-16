import {CircleXIcon, NotebookIcon} from 'lucide-react'
import toast, { LoaderIcon } from 'react-hot-toast'
import { useState, useEffect } from 'react'

import api from '../lib/axios.js'
import NavBar from '../components/NavBar'
import LiveNoteTile from '../components/LiveNoteTile'
import { useAuth } from '../context/AuthContext.jsx'

const LiveNotesPage = () => {
    const [loading,setLoading] = useState(true);
    const [liveNotes,setLiveNotes] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const res = await api.get('/liveNotes',{
                    withCredentials: true
                });
                console.log(res.data);
                setLiveNotes(res.data);
            }
            catch(error){
                console.log("Error fetching notes",error);
                toast.error("Failed to load notes");
            }
            finally{
                setLoading(false);
            }
        }
        if(user){
            fetchNotes();
        }
    },[]);

    return (
        <>
            <NavBar/>
            <main className='w-screen h-[86vh] flex items-center justify-center'>
                <ul className='list w-[80vw] max-h-[70vh] overflow-y-auto bg-secondary-content rounded-box shadow-xl'>
                    <li className='list-row text-2xl font-bold flex items-center'>Live Notes</li>
                    {loading && <li className='text-2xl h-15 flex items-center justify-center gap-2'><LoaderIcon/>Loading live notes</li>}
                    {!loading && liveNotes.length == 0 && <li className='text-xl h-15 flex items-center justify-center gap-1.5'><CircleXIcon/><span>No Live Notes found</span></li>}
                    {liveNotes.length > 0 &&
                        <>
                            {liveNotes.map((liveNote) => (
                                <LiveNoteTile key={liveNote._id} liveNote={liveNote} setLiveNotes={setLiveNotes}/>
                            ))}
                        </>
                    }
                </ul>
            </main>
        </>
    )
}

export default LiveNotesPage