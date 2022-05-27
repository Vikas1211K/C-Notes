import React,{useContext} from 'react'
import { MdEditNote, MdDeleteSweep } from 'react-icons/md'
import noteContext from '../context/NoteContext'


export const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNotes } = context
    const { note, updateNote } = props
    return (
        <div className="card col-md-3 my-3 me-3" >
            <div className="card-body">
                <div className='d-flex align-center '>
                    <h5 className="card-title me-3">{note.title}</h5>
                    <i href="/" className="card-link" onClick={()=>updateNote(note)} ><MdEditNote /></i>
                    <i href="/" className="card-link" onClick={()=>{deleteNotes(note._id)}} ><MdDeleteSweep /></i>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    )
}
