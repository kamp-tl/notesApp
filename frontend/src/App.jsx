import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from 'react-hot-toast'


const App = () => {
  return (
    <div className="min-h-screen bg-base-200" data-theme="cupcake">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App