import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({ note, onDeleteClick }) => {

    const navigate = useNavigate();

    const onEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/note/${note._id}`);
    }

    return (
        <div
            className="card bg-base-100 hover:shadow-lg transition-all 
    duration-200 border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                {/* Clickable Content Area */}
                <div
                    onClick={(e)=>{onEdit()}}
                    className="cursor-pointer"
                >
                    <h3 className="card-title text-base-content">{note.title}</h3>
                    <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                </div>

                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-small text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                     <div className="flex items-center gap-2">
                        <div
                            className="cursor-pointer hover:text-primary transition-colors"
                            onClick={(e)=>{onEdit()}}
                        >
                            <PenSquareIcon className='size-4' />
                        </div>
                        <button
                            className='btn btn-ghost btn-xs text-error hover:bg-error/10'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDeleteClick();
                            }}
                        >
                            <Trash2Icon className="size-4" />
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default NoteCard