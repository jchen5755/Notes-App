import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Button } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";

function App() {
    //use sate will retrun a 2 element array with a number and a function
    const [notes, setNotes] = useState<NoteModel[]>([]);

    useEffect(() => {
        async function loadNotes() {
            try {
                const response = await fetch("/api/notes", {
                    method: "GET",
                });
                const notes = await response.json();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        loadNotes();
    }, []); //the empty array will cause the useEffect to execute once on render. Without it it will execute after every new render

    return (
        <div>
            {notes.map((note) => (
                <Note note={note} key={note._id} />
            ))}
        </div>
    );
}

export default App;
