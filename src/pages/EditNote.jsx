import { useParams } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"

function EditNote(params) {
    const { id } = useParams()
    const [title, setTitle] = useState(params.data[Number(id)].title)
    const [content, setContent] = useState(params.data[Number(id)].content)

    const handleUpdate = () => {
        const updatedNote = { title, content }
        params.editNote(Number(id), updatedNote)
    }

    return (
        <div className="new-note-card-container">
            <div className="new-note-container">
                <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <Link to="/" className="save-btn" onClick={handleUpdate}>
                    Update Note
                </Link>

                <Link to="/" style={{ display: "block", marginTop: "10px", textDecoration: "none", color: "#333", marginTop: "20px", width: "fit-content" }}>
                    Cancel
                </Link>
            </div>
        </div>
    )
}

export default EditNote