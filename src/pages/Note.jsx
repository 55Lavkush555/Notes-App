import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './css/Note.css'

const Note = (params) => {
    const { id } = useParams()
    console.log(params.data[id])

    return (
        <div>
            <div className="header-container">
                <h1>Notes App</h1>
                <Link to="/" className="create-btn">
                    🔙 Back
                </Link>
            </div>

            <div className="container">
                <h2>{params.data[id].title}</h2>
                <p>
                    {params.data[id].content.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}

export default Note