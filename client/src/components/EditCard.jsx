import {useEditor, EditorContent, useEditorState, isActive} from '@tiptap/react';
import {BubbleMenu} from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

import api from '../lib/axios.js'

const EditCard = () => {
    const [note, setNote] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const editor = useEditor({
        extensions:[ // extension array
            StarterKit 
        ],
        content: ``, // initial content
    });

    const handleBold = () => {
        if (!editor) return;
        editor.chain().focus().toggleBold().run();
    }

    const handleItalic = () => {
        if (!editor) return;
        editor.chain().focus().toggleItalic().run();
    }
    
    const handleUnderline = () => {
        if (!editor) return;
        editor.chain().focus().toggleUnderline().run();
    }

    const editorState = useEditorState({
        editor,
        selector: ({editor}) => ({
            isBold: editor?.isActive('bold'),
            isItalic: editor?.isActive('italic'),
            isUnderline: editor?.isActive('underline')
        })
    })

    const handleSave = async () => {
        setIsSaving(true);
        const title = document.body.querySelector('.noteTitle').value;
        const content = editor.getHTML();

        const note = {
            title: title,
            content: content,
        }

        console.log(note);

        if(!title.trim() || !editor.getText().trim()){
            toast.error("All fields are required");
            setIsSaving(false);
            return;
        }

        if(title.length > 100){
            toast.error("Title can not be more than 100 characters");
            setIsSaving(false);
            return;
        }

        try{
            await api.put(`/notes/${id}`,note);
            console.log('Note updated successfully');
            toast.success('Note updated');
            navigate(`/note/${id}`);
        }
        catch(error){
            console.log('Error updating note',error);
            toast.error('Failed to update note');
        }
        finally{
            setIsSaving(false);
        }
    }

    useEffect(() => {
        const fetchNote = async () => {
            try{
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
                console.log('Note fetched successfully');
                document.querySelector('.noteTitle').value = res.data.title;
                editor?.commands.setContent(res.data.content);
            }
            catch(error){
                console.log('Error fetching note',error);
            }
        }
        if(editor){
            fetchNote();
        }
    }, [editor, id]); 

    return (
        <div className='p-6 pt-2 rounded-lg bg-secondary-content flex flex-col gap-1'>
            <span className='text-secondary text-3xl font-semibold mb-1 flex justify-center'>Update Note</span>

            <div className='bg-neutral-content p-2 rounded-md flex items-center gap-1 text-lg'>
                <label className='text-neutral'>Title:</label>
                <input 
                    type="text" 
                    placeholder='Enter title'
                    className='noteTitle text-neutral border border-neutral focus:outline-none rounded-sm w-95/100 p-1'
                />
            </div>

            <div className='h-10 w-3xl p-1 py-5 border-2 border-accent-content rounded-md flex items-center mt-4 gap-1'>
                <button onClick={handleBold} className={`btn h-8 ${editorState?.isBold?'bg-secondary text-neutral':''}`}>Bold</button>
                <button onClick={handleItalic} className={`btn h-8 ${editorState?.isItalic?'bg-secondary text-neutral':''}`}>Italic</button>
                <button onClick={handleUnderline} className={`btn h-8 ${editorState?.isUnderline?'bg-secondary text-neutral':''}`}>Underline</button>
            </div>

            <EditorContent editor={editor} className='px-2 py-1 bg-neutral-content text-lg text-neutral w-3xl h-50 overflow-y-auto rounded-lg'/>

            <div className='flex justify-between'>
                <button onClick={() => navigate('/home')} className='btn'><ArrowLeftIcon/></button>
                <button onClick={handleSave} className='btn btn-success'>{isSaving?<LoaderIcon/>:<SaveIcon/>}</button>
            </div>
        </div>
    )
}

export default EditCard