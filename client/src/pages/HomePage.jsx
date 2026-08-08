import {CircleXIcon, NotebookIcon} from 'lucide-react'
import toast, { LoaderIcon } from 'react-hot-toast'
import { useState, useEffect } from 'react'

import api from '../lib/axios.js'
import NavBar from '../components/NavBar.jsx'
import NoteTile from '../components/NoteTile.jsx'

const HomePage = () => {
    const [loading,setLoading] = useState(true);
    const [notes,setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const res = await api.get('/notes');
                console.log(res.data);
                setNotes(res.data);
            }
            catch(error){
                console.log("Error fetching notes",error);
                toast.error("Failed to load notes");
            }
            finally{
                setLoading(false);
            }
        }
        fetchNotes();
    },[]);

    return (
        <>
            <NavBar />
            <main className='w-screen h-[86vh] flex items-center justify-center'>
                <ul className='list w-[60vw] max-h-[70vh] overflow-y-auto bg-secondary-content rounded-box shadow-xl'>
                    <li className='list-row text-2xl font-bold flex items-center'>
                        <NotebookIcon className='scale-110'/>Notes
                    </li>
                    {loading && <li className='text-2xl h-15 flex items-center justify-center gap-2'><LoaderIcon/>Loading notes</li>}
                    {!loading && notes.length == 0 && <li className='text-xl h-15 flex items-center justify-center gap-1.5'><CircleXIcon/><span>No notes found</span></li>}
                    {notes.length > 0 &&
                        <>
                            {notes.map((note) => (
                                <NoteTile key={note._id} note={note} setNotes={setNotes}/>
                            ))}
                        </>
                    }
                </ul>
            </main>
        </>
    )
}

export default HomePage