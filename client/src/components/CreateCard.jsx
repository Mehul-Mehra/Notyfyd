import {useEditor, EditorContent, useEditorState, isActive} from '@tiptap/react';
import {BubbleMenu} from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import api from '../lib/axios.js'

const CreateCard = (props) => {
    const navigate = useNavigate();
    const [isSaving,setIsSaving] = useState(false);

    const editor = useEditor({
        extensions:[ // extension array
            StarterKit 
        ],
        content: `Enter content`, // initial content
    });

    const handleBold = () => {
        editor.chain().focus().toggleBold().run();
    }

    const handleItalic = () => {
        editor.chain().focus().toggleItalic().run();
    }
    
    const handleUnderline = () => {
        editor.chain().focus().toggleUnderline().run();
    }

    const editorState = useEditorState({
        editor,
        selector: ({editor}) => ({
            isBold: editor.isActive('bold'),
            isItalic: editor.isActive('italic'),
            isUnderline: editor.isActive('underline')
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
            await api.post('/notes',note);
            console.log('Note created successfully');
            toast.success('Note created');
            navigate('/');
        }
        catch(error){
            console.log('Error creating note',error);
            if(error.response?.status === 409){
                toast.error('Note with the same title already exists')
            }
            else{
                toast.error('Failed to create note');
            }
        }
        finally{
            setIsSaving(false);
        }
    }

    return (
        <div className='p-6 pt-2 rounded-lg bg-secondary-content flex flex-col gap-1'>
            <span className='text-secondary text-3xl font-semibold mb-1 flex justify-center'>Create Note</span>

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
                <button onClick={() => handleSave()} className='btn btn-success'>{isSaving?<LoaderIcon/>:<SaveIcon/>}</button>
            </div>
        </div>
    )
}

export default CreateCard;