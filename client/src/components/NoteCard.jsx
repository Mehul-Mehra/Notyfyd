import {useEffect, useState} from 'react'
import {NotebookPenIcon, Trash2Icon} from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import toast, { LoaderIcon } from 'react-hot-toast'
import DOMPurify from 'dompurify'

import { formatDate } from '../lib/utils'
import api from '../lib/axios.js'

const NoteCard = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleEdit = async (event) => {
        event.stopPropagation();
        navigate(`/edit/${id}`);
    }

    const handleDelete = async (event) => {
        event.stopPropagation();
        if(!window.confirm(`Are you sure you want to delete the note "${note.title}"?`)) return;

        try{
            await api.delete(`/notes/${id}`);
            console.log('Deleted note successfully');
            navigate('/home');
            toast.success('Note deleted');
        }
        catch(error){
            console.log('Error deleting note',error);
            toast.error('Failed to delete note');
        }
    }

    useEffect(() => {
        const fetchNote = async () => {
            try{
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
                console.log("Note fetched succesfully");
            }
            catch(error){
                console.log("Error fetching note",error);
                toast.error("Error loading note");
                navigate("/home");
            }
            finally{
                setLoading(false);
            }
        };
        fetchNote();
    },[id]);

    return (
        <div className="h-[60vh] w-[40vw] bg-secondary-content rounded-xl flex flex-col items-center justify-center gap-2">
            {loading && <div className='flex'><LoaderIcon/></div>}
            {!loading && note && <>
                <div className="h-1/10 w-9/10 rounded-lg flex items-center justify-center text-3xl font-bold">{note.title}</div>
                <div 
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(note.content)}}
                className="h-13/20 w-9/10 pl-2 pr-1 pt-1 pb-1 bg-neutral-content text-neutral text-xl rounded-lg opacity-75 overflow-y-auto">
                </div>
                <div className="h-1/10 w-9/10 flex items-center justify-between">
                    <div>
                        <div>Created: {formatDate(new Date(note.createdAt))}</div>
                        <div>Updated: {formatDate(new Date(note.updatedAt))}</div>
                    </div>
                    <div className='flex gap-3'>
                        <button onClick={handleEdit} className="btn btn-soft scale-110">
                            <NotebookPenIcon/>
                        </button>
                        <button onClick={handleDelete} className="btn btn-soft scale-110">
                            <Trash2Icon className="text-red-500"/>
                        </button>
                    </div>
                </div>
            </>
            }
        </div>
    )
}

export default NoteCard