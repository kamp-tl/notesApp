
import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("https://notesapp-gvf1.onrender.com/notes");
                setNotes(res.data)
            } catch (error) {
                console.error(`error: ${error.message}`)
                toast.error('failed to load notes')
            }
            finally {
                setLoading(false)
            }
        }
        fetchNotes()
    }, [])

    const handleDeleteNote = async () => {
        if (!selectedNote) return;
        try {
            await api.delete(`https://notesapp-gvf1.onrender.com/notes/${selectedNote._id}`);
            setNotes((prev) => prev.filter(note => note._id !== selectedNote._id));
            toast.success("Note Deleted Successfully");
            setSelectedNote(null);
            document.getElementById('delete_modal_global').close();
        } catch (err) {
            toast.error("failed to delete");
            console.error("failed to delete", err);
        }
    }

    return (
        <div className="min-h-screen">
            <NavBar />

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

                {notes.length === 0 && <NotesNotFound />}

                {notes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map(note => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onDeleteClick={() => {
                                    setSelectedNote(note);
                                    document.getElementById('delete_modal_global').showModal();
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Global Delete Modal */}
            <dialog id="delete_modal_global" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Note</h3>
                    <p className="py-4">Are you sure you want to delete <span className="font-semibold">{selectedNote?.title}</span>? This action cannot be undone.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn mr-2" onClick={() => setSelectedNote(null)}>Cancel</button>
                            <button
                                className="btn btn-error"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteNote();
                                }}
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setSelectedNote(null)}>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default HomePage