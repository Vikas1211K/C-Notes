import React, { useState } from 'react'
import noteContext from './NoteContext'

const NoteState = (props) => {
    const HOST="http://localhost:5000/"

    const [notes, setnotes] = useState([])
    
    //getNotes
    const getNotes = async ()=>{
        //TODO: add notes api
        const response = await fetch(`${HOST}api/notes/fetchAllNotes`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
          });
          const json = await response.json()
          //console.log(json)
          setnotes(json)
    }

    //addNotes
    const addNotes = async (title,description,tag)=>{
        //TODO: add notes api
        const response = await fetch(`${HOST}api/notes/addNewNote`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          const note = await response.json()
          setnotes(notes.concat(note))
    }

    //deleteNotes
    const deleteNotes = async (id)=>{
        //TODO: add notes api
        const response = await fetch(`${HOST}api/notes/deleteNote/${id}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            }
          });
          const json = await response.json()
          console.log(json)
        //logic to delete note
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes)
    }

    //editNotes
    const editNotes = async (id,title,description,tag)=>{
        //API call
        const response = await fetch(`${HOST}api/notes/updateNote/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({id,title,description,tag})
          });
          const json = await response.json()
          console.log(json)
        
        //edit notes in client
        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                element.title=title;
                element._id=id;
                element.description=description;
                element.tag=tag;
                break;    
            }
            setnotes(newNotes)  
        }
    }
    
    return (
        <noteContext.Provider value={{ 
            notes,
            addNotes,
            deleteNotes,
            editNotes,
            getNotes,
        }}>
            {props.children}
            
        </noteContext.Provider >
    )
}
export default NoteState