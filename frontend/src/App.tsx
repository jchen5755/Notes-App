import React, { useEffect, useState } from "react";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import logo from "./logo.svg";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";

function App() {
    //use state will retrun a 2 element array with a number and a function
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(() => {
        async function loadNotes() {
            try {
                setShowNotesLoadingError(false);
                setNotesLoading(true);

                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);
            } finally {
                setNotesLoading(false);
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

    const notesGrid = (
        <Row xs={1} md={2} lg={3} className={`g-4 ${styles.notesGrid}`}>
            {notes.map((note) => (
                <Col key={note._id}>
                    <Note
                        note={note}
                        className={styles.note}
                        onNoteClicked={setNoteToEdit}
                        onDeleteNoteClicked={deleteNote}
                    />
                </Col>
            ))}
        </Row>
    );

    return (
        <Container className={styles.notesPage}>
            <Button
                className={`mb-4 ${stylesUtils.blockCenter}`}
                onClick={() => {
                    setShowAddNoteDialog(true);
                }}
            >
                Add new note
            </Button>
            {notesLoading && <Spinner animation="border" variant="primary" />}
            {showNotesLoadingError && (
                <p>Something went wrong. Please refresh the page</p>
            )}
            {!notesLoading && !showNotesLoadingError && (
                <>
                    {notes.length > 0 ? (
                        notesGrid
                    ) : (
                        <p>You don't have any notes yet</p>
                    )}
                </>
            )}
            {showAddNoteDialog && (
                <AddEditNoteDialog
                    onDismiss={() => setShowAddNoteDialog(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialog(false);
                    }}
                />
            )}
            {noteToEdit && (
                <AddEditNoteDialog
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(
                            notes.map((existingNote) =>
                                existingNote._id === updatedNote._id
                                    ? updatedNote
                                    : existingNote
                            )
                        );
                        setNoteToEdit(null);
                    }}
                />
            )}
        </Container>
    );
}

export default App;
