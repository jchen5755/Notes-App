import React, { useEffect, useState } from "react";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import logo from "./logo.svg";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
    //use sate will retrun a 2 element array with a number and a function
    const [notes, setNotes] = useState<NoteModel[]>([]);

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

    useEffect(() => {
        async function loadNotes() {
            try {
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        loadNotes();
    }, []); //the empty array will cause the useEffect to execute once on render. Without it it will execute after every new render

    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(
                notes.filter((existingNote) => existingNote._id !== note._id)
            );
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Container>
            <Button
                className={`mb-4 ${stylesUtils.blockCenter}`}
                onClick={() => {
                    setShowAddNoteDialog(true);
                }}
            >
                Add new note
            </Button>
            <Row xs={1} md={2} lg={3} className="g-4">
                {notes.map((note) => (
                    <Col key={note._id}>
                        <Note
                            note={note}
                            className={styles.note}
                            onDeleteNoteClicked={deleteNote}
                        />
                    </Col>
                ))}
            </Row>
            {showAddNoteDialog && (
                <AddNoteDialog
                    onDismiss={() => setShowAddNoteDialog(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialog(false);
                    }}
                />
            )}
        </Container>
    );
}

export default App;
