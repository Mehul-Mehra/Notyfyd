import {Route, Routes} from 'react-router'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import EditPage from './pages/EditPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

const App = () => {
    return (
        <div className='w-full h-full overflow-x-hidden' data-theme='abyss'>

            <Routes>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/create' element={<CreatePage/>}/>
                <Route path='/note/:id' element={<NoteDetailPage/>}/>
                <Route path='/edit/:id' element={<EditPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </div>
    )
} 

export default App