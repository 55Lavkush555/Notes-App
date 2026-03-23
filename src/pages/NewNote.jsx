import { useState } from 'react'
import "./css/NewNote.css"
import { Link } from 'react-router-dom'

function NewNote(props) {
  let [title, setTitle] = useState("")
  let [content, setContent] = useState("")

  const handleSaveNote = () => {
    if (title.trim() && content.trim()) {
      props.addNote({ title, content })
      setTitle("")
      setContent("")
    }
  }

  return (
    <div className="new-note-card-container">
        <div className="new-note-container">
            <h2 className="text-2xl font-bold mb-4">Create New Note</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={(e)=> setContent(e.target.value)}></textarea>
            <Link to="/" className="save-btn" onClick={handleSaveNote}>
              Save Note
            </Link>
        </div>
    </div>
  )
}

export default NewNote