import NavBar from "../components/NavBar"
import NoteCard from "../components/NoteCard"

const NoteDetailPage = () => {
    return (
        <>
            <NavBar />
            <main className='w-screen h-[86vh] flex items-center justify-center'>
                <NoteCard/>
            </main>
        </>
    )
}

export default NoteDetailPage