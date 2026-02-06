
import {useState , useEffect} from 'react'
import NavBar from '../components/NavBar'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'

const HomePage = () => {
    const [notes , setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchNotes = async () => {
        try {
            const res = await api.get("/notes");
            console.log(res.data);
            setNotes(res.data)
            
        }catch(error){
            console.error(`error: ${error.message}`)
            toast.error('failed to load notes')
        }
        finally{
            setLoading(false)
        }
    }
    fetchNotes()
},[])

  return (
    <div className="min-h-screen">
        <NavBar />

        <div className="max-w-7xl mx0-auto p-4 mt-6">
            {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

            {notes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map(note => (
                      <NoteCard key={note._id} note={note}/>
                    ))}
                </div>
            )}            
        </div>
    </div>
  )
}

export default HomePage