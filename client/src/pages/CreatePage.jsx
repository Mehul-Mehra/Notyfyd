import NavBar from "../components/NavBar"
import NoteCard from "../components/NoteCard"
import CreateCard from "../components/CreateCard"

const CreatePage = () => {
    return (
        <>
            <NavBar/>
            <main className='w-screen h-[86vh] flex items-center justify-center'>
                <CreateCard/>
            </main>
        </>
    )
}

export default CreatePage