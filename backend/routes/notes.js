const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Note = require('../modules/Note')
const fetchUser = require('../middleware/fetchuser')

//Route 1: Get all the notes of a user using: GET "/api/notes/fetchAllNotes" login req
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error occured!!")
    }
})

//Route 2: Add new note of a user using: POST "/api/notes/addNewNote" login req
router.post('/addNewNote', fetchUser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Desicription must be longer then 5 char').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const notes = new Note({
            title, description, tag, user: req.user.id
        })
        const savenotes = await notes.save()

        res.json(savenotes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error occured!!")
    }
})

//Route 3: Update note of a user using: PUT "/api/note/updateNote" login req
router.put('/updateNote/:id', fetchUser, async (req,res)=>{
    const {title, description, tag} = req.body;

    try {
        //create a new note obj
        const newNote= {}
        if(title){newNote.title= title}
        if(description){newNote.description= description}
        if(tag){newNote.tag= tag}
    
        //Find note to updated and update it
        let note= await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
        res.status(200).json({note})
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error occured!!")
    }
})

//Route 4: Delete note of a user using: DELETE "/api/note/deleteNote" login req
router.delete('/deleteNote/:id', fetchUser, async (req,res)=>{
    
    try {
        //Find note to updated and update it
        let note= await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
        }
        //allow only if user is the owner of the note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({"success":"Note has been successfully deleted", note})
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error occured!!")
    }
})

module.exports = router