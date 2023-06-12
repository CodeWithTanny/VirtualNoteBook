import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../Context/notes/NoteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote';

export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  // these can be taken from addNote Component
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }

  const handleClick = (e) => {
    console.log("Updating the Note",note)
    refClose.current.click();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Addnote />
      {/* taking from bootstrap documentaion */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* taking from addnote component */}
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={ note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes