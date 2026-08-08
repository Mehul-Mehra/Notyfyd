import NavBar from "../components/NavBar"
import EditCard from "../components/EditCard"

const EditPage = () => {
    return (
        <>
            <NavBar/>
            <main className='w-screen h-[86vh] flex items-center justify-center'>
                <EditCard/>
            </main>
        </>
    )
}

export default EditPage