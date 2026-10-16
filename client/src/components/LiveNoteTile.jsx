import { NotepadTextIcon, NotebookPenIcon, Trash2Icon } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'

import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const handleEdit = async (liveNote) => {
    navigate(`/live-notes/${liveNote._id}`)
}

const handleDelete = async (e, liveNote, setLiveNotes) => {
    e.stopPropagation();
    if(!window.confirm("Do you want to delete the live note?")) return;
    try{
        await api.delete(`/liveNotes/${liveNote._id}`,{
            withCredentials: true
        });
        console.log("Live note deleted successfully");
        setLiveNotes((prev) => prev.filter((curr) => curr._id !== liveNote._id));
        toast.success("Live note deleted");
    }
    catch(error){
        console.log('Error deleting live note',error);
        toast.error('Failed to delete live note');
    }
} 

const LiveNoteTile = ({liveNote, setLiveNotes}) => {
    const navigate = useNavigate();

    return (
        <li onClick={() => navigate(`/live-notes/${liveNote._id}`)} className="list-row w-full text-2xl flex items-center justify-between hover:shadow-[0_0_10px_2px_rgba(34,211,238,0.4)]">
            <div className="flex items-center gap-4">
                <NotepadTextIcon className="scale-110"/>
                <span>{liveNote.title}</span>
            </div>
            <div className="flex gap-2">
                <button onClick={() => handleEdit(liveNote)} className="btn btn-ghost">
                    <NotebookPenIcon className="scale-110"/>
                </button>
                <button onClick={(e) => handleDelete(e, liveNote, setLiveNotes)} className="btn btn-ghost">
                    <Trash2Icon className="text-red-500 scale-110"/>
                </button>
            </div>
        </li>
    )
}

export default LiveNoteTile