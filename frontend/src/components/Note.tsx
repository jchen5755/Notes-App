// components are all created as functions

import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";

interface NoteProps {
    note: NoteModel;
}

//passing as a destructured { note }: NoteProps argument to the function
const Note = ({ note }: NoteProps) => {
    //unpacking the note properties
    const { title, text, createdAt, updatedAt } = note;

    //return the UI that will be rendered on the screen
    return (
        <Card className={styles.noteCard}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className={styles.cardText}>{text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Note;
