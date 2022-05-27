import React,{useContext, useState} from 'react'
import noteContext from '../context/NoteContext'


export const AddNote = () => {
    const context = useContext(noteContext)
    const { addNotes } = context
    const [note, setnote] = useState({title:"", description:"",tag:"Default" })

    const handleClick =(e)=>{
        e.preventDefault();
        addNotes(note.title, note.description, note.tag)
        setnote({title:"", description:"",tag:"Default" })
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value })
    }

  return (
    <div className='container'>
        <h2>Add your notes</h2>
        <form className='my-3'>
          <div className='mb-3'>
            <input type="text" className='form-control'  name="title" value={note.title} placeholder='Title' onChange={onChange}></input>
          </div>
          <div className='mb-3'>
            <input type="text" className="form-control"  name="tag" value={note.tag} placeholder='Tag' onChange={onChange}></input>
          </div>
          <div className='mb-3'>
            <textarea type="text" className="form-control "  rows="8" name="description" value={note.description} placeholder='Description' onChange={onChange}></textarea>
          </div>
          <button disabled={note.description.length<5 || note.title.length<5} type='submit' className='btn btn-primary' onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}
