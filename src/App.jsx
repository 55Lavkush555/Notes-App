import { Routes, Route, Link } from "react-router-dom"
import NewNote from "./pages/NewNote"
import EditNote from "./pages/EditNote"
import Note from "./pages/Note"
import { useState } from "react"
import editIcon from "./assets/edit-icon.png"
import deleteIcon from "./assets/delete-icon.png"
import "./App.css"


// ✅ Home outside (no focus issue)
function Home({ notes, deleteNote, searchTerm, setSearchTerm }) {

  // ✅ filter notes
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="header-container">
        <h1>Notes App</h1>
        <Link to="/new-note" className="create-btn">
          Add Note
        </Link>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="notes-container">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {

            // ✅ FIX: get original index
            const originalIndex = notes.indexOf(note)

            return (
              <div className="note" key={originalIndex}>
                <Link to={`/note/${originalIndex}`} className="text">
                  <h3>{note.title}</h3>
                  <p>{(note.content || "").slice(0, 100)}...</p>
                </Link>

                <div className="actions">
                  <Link to={`/edit-note/${originalIndex}`} className="edit-btn">
                    <img src={editIcon} alt="Edit" className="fix-img" />
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(originalIndex)}
                  >
                    <img src={deleteIcon} alt="Delete" className="fix-img" />
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <p className="no-notes">No notes found</p>
        )}
      </div>
    </>
  )
}


function App() {

  const notesData =
    JSON.parse(localStorage.getItem("notes")) || []

  const [notes, setNotes] = useState(notesData)
  const [searchTerm, setSearchTerm] = useState("")

  const addNote = (note) => {
    const updatedNotes = [...notes, note]
    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index)
    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  const editNote = (index, updatedNote) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? updatedNote : note
    )
    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            notes={notes}
            deleteNote={deleteNote}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
      />
      <Route path="/new-note" element={<NewNote addNote={addNote} />} />
      <Route path="/edit-note/:id" element={<EditNote editNote={editNote} data={notes} />} />
      <Route path="/note/:id" element={<Note data={notes} />} />
    </Routes>
  )
}

export default App