// components are all created as functions

import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel;
    onNoteClicked: (note: NoteModel) => void;
    onDeleteNoteClicked: (note: NoteModel) => void;
    className?: string;
}

//passing as a destructured { note }: NoteProps argument to the function
const Note = ({
    note,
    onNoteClicked,
    onDeleteNoteClicked,
    className,
}: NoteProps) => {
    //unpacking the note properties
    const { title, text, createdAt, updatedAt } = note;

    let createdAtText: string;
    if (updatedAt > createdAt) {
        createdAtText = "Updated: " + formatDate(updatedAt);
    } else {
        createdAtText = "Created: " + formatDate(createdAt);
    }

    //return the UI that will be rendered on the screen
    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={stylesUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>{text}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{createdAtText}</Card.Footer>
        </Card>
    );
};

export default Note;
