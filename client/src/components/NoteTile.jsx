import { NotebookPenIcon, NotepadTextIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import api from '../lib/axios.js'

const NoteTile = ({note, setNotes}) => {
    const navigate = useNavigate();

    const handleEdit = async (event) => {
        event.stopPropagation();
        navigate(`/edit/${note._id}`);
    }

    const handleDelete = async (event) => {
        event.stopPropagation();
        if(!window.confirm(`Are you sure you want to delete the note "${note.title}"?`)) return;

        try{
            await api.delete(`/notes/${note._id}`);
            console.log('Deleted note successfully');
            setNotes((prev) => prev.filter((currentNote) => currentNote._id !== note._id));
            toast.success('Note deleted');
        }
        catch(error){
            console.log('Error deleting note',error);
            toast.error('Failed to delete note');
        }
    }

    return (
        <li onClick={()=>{navigate(`/note/${note._id}`)}} className="list-row w-full text-2xl flex items-center justify-between hover:shadow-[0_0_10px_2px_rgba(34,211,238,0.4)]">
            <div className="flex items-center gap-4">
                <NotepadTextIcon className="scale-110"/>
                <span>{note.title}</span>
            </div>
            <div className="flex gap-2">
                <button onClick={(e) => handleEdit(e)} className="btn btn-ghost">
                    <NotebookPenIcon className="scale-110"/>
                </button>
                <button onClick={(e) => handleDelete(e)} className="btn btn-ghost">
                    <Trash2Icon className="text-red-500 scale-110"/>
                </button>
            </div>
        </li>
    )
}

export default NoteTile